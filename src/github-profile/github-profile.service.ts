import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, concatMap, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeocodingService } from './geocoding.service';
import { GithubProfileResponse } from './interfaces/github-profile.interfaces';
import { GithubProfileModel } from './schema/github-profile.schema';
import { UserModel } from '../user/schema/user.schema';

@Injectable()
export class GithubProfileService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @InjectModel(GithubProfileModel.name)
    private readonly githubModel: Model<GithubProfileModel>,
    private readonly geocodingService: GeocodingService,
    private readonly httpService: HttpService,
  ) {}

  public async create(username: string, discord: string) {
    const data = await lastValueFrom(
      this.getGithubProfile(username).pipe(
        concatMap(async (githubData) => {
          Object.keys(githubData).forEach((key) => {
            if (githubData[key] === null) {
              delete githubData[key];
            }
          });
          if (!githubData.location) return githubData;
          return {
            location: await this.geocodingService.fetchCoordinates(
              githubData.location,
            ),
            name: githubData.name,
          };
        }),
      ),
    );

    const createdGithubProfile = new this.githubModel({
      _id: data.name,
      location: data.location,
    });
    try {
      const user = await this.userModel.findByIdAndUpdate(
        discord,
        {
          github: data.name,
        },
        { new: true },
      );
      if (!user) {
        throw new HttpException(
          `User with ID ${discord} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return await createdGithubProfile.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteOne(username: string) {
    try {
      await this.userModel.updateMany(
        { github: username },
        { $unset: { github: 1} },
     )
      return await this.githubModel.findByIdAndDelete(username);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Github-Profile for ${username} could not be deleted`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateOne(github: string, discord: string) {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        discord,
        {
          github: github,
        },
        { new: true },
      );
      if (!user) {
        throw new HttpException(
          `User with ID ${discord} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      const githubProfile = await this.githubModel.findById(github);
      if (!githubProfile) {
        throw new HttpException(
          `Github-Profile with ID ${github} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      if (!githubProfile.location) return githubProfile;
      return await this.githubModel.findByIdAndUpdate(
        github,
        {
          location: await this.geocodingService.fetchCoordinates(
            githubProfile.location.provided,
          ),
          $inc: {
            __v: 1,
          },
        },
        { new: true },
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async findOne(username: string) {
    return await this.githubModel.findById(username);
  }

  public async findAll() {
    return await this.githubModel.find();
  }


  private getGithubProfile(username: string) {
    return this.httpService
      .get(`https://api.github.com/users/${username}`)
      .pipe(
        catchError(() => {
          throw new HttpException(
            `Github-Profile for ${username} could not be found`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
        map((response) => response.data),
        map((githubProfileResponse: GithubProfileResponse) => {
          return {
            location: githubProfileResponse.location,
            name: githubProfileResponse.login,
          };
        }),
      );
  }
}
