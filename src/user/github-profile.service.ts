import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, concatMap, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeocodingService } from './geocoding.service';
import { GithubProfileResponse } from './interfaces/user.interfaces';
import { GithubProfile } from './schema/user.schema';

@Injectable()
export class GithubProfileService {
  constructor(
    @InjectModel(GithubProfile.name)
    private readonly githubModel: Model<GithubProfile>,
    private readonly geocodingService: GeocodingService,
    private readonly httpService: HttpService,
  ) {}

  public async create(username: string) {
    const location = await lastValueFrom(
      this.getGithubProfile(username).pipe(
        concatMap(async (location) =>
          this.geocodingService.fetchCoordinates(location),
        ),
      ),
    );

    const createdGithubProfile = new this.githubModel({
      _id: username,
      location,
    });
    await createdGithubProfile.save();
    return createdGithubProfile;
  }

  private getGithubProfile(username: string) {
    return this.httpService
      .get(`https://api.github.com/users/${username}`)
      .pipe(
        catchError((error) => {
          throw new HttpException(
            `Fetching profile for ${username} failed`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
        map((response) => response.data),
        map(
          (githubProfileResponse: GithubProfileResponse) =>
            githubProfileResponse.location,
        ),
      );
  }
}
