import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, concatMap, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeocodingService } from './geocoding.service';
import { GithubProfileResponse } from '../user/interfaces/user.interfaces';
import { GithubProfileModel } from './schema/github-profile.schema';

@Injectable()
export class GithubProfileService {
  constructor(
    @InjectModel(GithubProfileModel.name)
    private readonly githubModel: Model<GithubProfileModel>,
    private readonly geocodingService: GeocodingService,
    private readonly httpService: HttpService,
  ) {}

  public async create(username: string) {
    const location = await lastValueFrom(
      this.getGithubProfile(username).pipe(
        concatMap(async (githubData) => {
          Object.keys(githubData).forEach((key) => {
            if (githubData[key] === null) {
              delete githubData[key];
            }
          });
          if (!githubData.location) return { ...githubData };
          return {
            ...githubData,
            location: await this.geocodingService.fetchCoordinates(
              githubData.location,
            ),
          };
        }),
      ),
    );

    const createdGithubProfile = new this.githubModel({
      _id: username,
      ...location,
    });
    try {
      return await createdGithubProfile.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async delete(username: string) {
    try {
      return await this.githubModel.findByIdAndDelete(username);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Github-Profile for ${username} could not be deleted`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
        map((githubProfileResponse: GithubProfileResponse) => {
          return {
            location: githubProfileResponse.location,
            repos: githubProfileResponse.public_repos,
            followers: githubProfileResponse.followers,
          };
        }),
      );
  }
}
