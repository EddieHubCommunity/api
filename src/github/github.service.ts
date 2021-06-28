import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommunityStats, GithubProfile } from './interfaces/github.interface';
import { GithubDTO } from './dto/github.dto';
import { CommunitystatsMappingService } from './communitystats-mapping.service';
import { GeocodingService } from './geocoding.service';
import {
  AstraService,
  deleteItem,
  documentId,
} from '@cahllagerfeld/nestjs-astra';
import { from, Observable } from 'rxjs';
import { catchError, concatMap, filter } from 'rxjs/operators';

@Injectable()
export class GithubService {
  constructor(
    private readonly mappingService: CommunitystatsMappingService,
    private readonly geocodingService: GeocodingService,
    private readonly astraService: AstraService,
  ) {}

  async create(body: GithubDTO): Promise<documentId> {
    let newGithubProfile: GithubProfile;
    let creationResponse;
    try {
      newGithubProfile = await this.createGithub(body);

      creationResponse = await this.astraService
        .create<GithubProfile>(newGithubProfile)
        .toPromise();
    } catch (e) {
      throw new HttpException(
        'Creation didnt pass as expected',
        HttpStatus.BAD_REQUEST,
      );
    }

    return creationResponse;
  }

  findAll() {
    return this.astraService
      .find<GithubProfile>()
      .pipe(catchError(() => from([{}])));
  }

  findOne(id: string): Observable<GithubProfile> {
    return this.astraService.get<GithubProfile>(id).pipe(
      catchError(() => {
        throw new HttpException(
          `no github-profile for ${id} found`,
          HttpStatus.NOT_FOUND,
        );
      }),
    );
  }

  async update(id: string, body: GithubDTO): Promise<documentId> {
    const {
      username,
      bio,
      avatarUrl,
      repos,
      event,
      followers,
      location,
      blog,
      organization,
    } = body;

    let oldDocument;
    try {
      oldDocument = await this.astraService.get<GithubProfile>(id).toPromise();
    } catch (e) {
      throw new HttpException(
        `no github-profile for ${id} found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updateGithubProfile: GithubProfile = { ...oldDocument };
    if (username) {
      updateGithubProfile.username = username;
    }
    if (bio) {
      updateGithubProfile.bio = bio;
    }
    if (avatarUrl) {
      updateGithubProfile.avatarUrl = avatarUrl;
    }
    if (repos) {
      updateGithubProfile.repos = repos;
    }
    if (event) {
      updateGithubProfile.communityStats = this.mappingService.mapCommunityState(
        event,
        updateGithubProfile.communityStats,
      );
    }
    if (followers) {
      updateGithubProfile.followers = followers;
    }
    if (organization) {
      updateGithubProfile.organization = organization;
    }
    if (blog) {
      updateGithubProfile.blog = blog;
    }
    if (location) {
      const locationObject = await this.geocodingService.fetchCoordinates(
        location,
      );
      updateGithubProfile.location = locationObject;
    }

    updateGithubProfile.updatedOn = new Date();

    let updateResponse;
    try {
      updateResponse = await this.astraService
        .replace<GithubProfile>(id, updateGithubProfile)
        .toPromise();
    } catch (e) {
      throw new HttpException(
        `no github-profile for ${id} found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return updateResponse;
  }

  remove(id: string): Observable<deleteItem> {
    return this.astraService.get<GithubProfile>(id).pipe(
      catchError(() => {
        throw new HttpException(
          `no github-profile for ${id} found`,
          HttpStatus.NOT_FOUND,
        );
      }),
      filter((data) => {
        if (!data) {
          throw new HttpException(
            `no github-profile for ${id} found`,
            HttpStatus.NOT_FOUND,
          );
        }

        return true;
      }),
      concatMap(() =>
        this.astraService
          .delete(id)
          .pipe(filter((data: deleteItem) => data.deleted === true)),
      ),
    );
  }

  private async createGithub(body: GithubDTO): Promise<GithubProfile> {
    const newGithubProfile: GithubProfile = {
      username: body.username,
      avatarUrl: body.avatarUrl,
      bio: body.bio,
      communityStats: body.event
        ? this.mappingService.mapCommunityState(
            body.event,
            {} as CommunityStats,
          )
        : {},
      followers: body.followers,
      repos: body.repos,
      blog: body.blog,
      organization: body.organization,
      createdOn: new Date(),
      updatedOn: new Date(),
    };
    if (body.location) {
      const locationObject = await this.geocodingService.fetchCoordinates(
        body.location,
      );
      newGithubProfile.location = locationObject;
    }

    return newGithubProfile;
  }
}
