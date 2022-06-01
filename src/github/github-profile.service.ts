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
import { CreateEventDTO } from './dto/create-events.dto';
import { eventMap } from './data/event-map';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
@Injectable()
export class GithubProfileService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @InjectModel(GithubProfileModel.name)
    private readonly githubModel: Model<GithubProfileModel>,
    private readonly geocodingService: GeocodingService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async create(username: string) {
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
      events: {},
    });
    return await createdGithubProfile.save();
  }

  public async deleteOne(username: string) {
    try {
      await this.userModel.updateMany(
        { github: username },
        { $unset: { github: 1 } },
      );
      return await this.githubModel.findByIdAndDelete(username);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Github-Profile for ${username} could not be deleted`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateOne(github: string) {
    try {
      const githubProfile = await this.githubModel.findById(github);
      if (!githubProfile) {
        throw new HttpException(
          `Github-Profile with ID ${github} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      if (!githubProfile.location) {
        return await this.githubModel.findByIdAndUpdate(
          github,
          {
            $inc: {
              __v: 1,
            },
          },
          { new: true },
        );
      }
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
    const github = await this.githubModel.findById(username);
    if (!github) {
      throw new HttpException(
        `Github-Profile with ID ${username} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return github;
  }

  public async findAll() {
    return await this.githubModel.find();
  }

  public async findEddiehub() {
    return await this.githubModel.findById('EddieHubCommunity');
  }

  public async bumpEvent(data: CreateEventDTO) {
    await this.bumpEddiehub(data.event);
    const github = await this.githubModel.findById(data.githubUsername);
    if (!github) {
      throw new HttpException(
        `Github-Profile with ID ${data.githubUsername} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.githubModel.findByIdAndUpdate(
      data.githubUsername,
      {
        $inc: {
          [`events.${this.mapEvent(data.event)}`]: 1,
        },
      },
      { new: true },
    );
  }

  private async bumpEddiehub(event: string) {
    const eddiehub = await this.githubModel.findOneAndUpdate(
      { _id: 'EddieHubCommunity' },
      {
        $inc: {
          [`events.${this.mapEvent(event)}`]: 1,
        },
      },
      { new: true, upsert: true },
    );
    return eddiehub;
  }

  private getGithubProfile(username: string) {
    const githubToken = this.configService.get('GH_TOKEN');
    const config: AxiosRequestConfig = { headers: {} };
    if (githubToken) config.headers['Authorization'] = `token ${githubToken}`;
    return this.httpService
      .get(`https://api.github.com/users/${username}`, config)
      .pipe(
        catchError((e) => {
          console.log(e.response.data);
          throw new HttpException(
            `Error when fetching Github-Profile for ${username}: ${e.response.data.message}`,
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

  public mapEvent(githubEvent: string): string {
    let mappedValue: string;
    try {
      mappedValue = eventMap[githubEvent];
    } catch {
      throw new HttpException(
        'Please Provide valid Githubevent',
        HttpStatus.BAD_REQUEST,
      );
    }
    return mappedValue;
  }

  public async getUserFromDatabase(username: string) {
    const github = await this.githubModel.findById(username);
    return github;
  }
}
