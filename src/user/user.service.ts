import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { UserDTO } from './dto/user.dto';
import { GeocodingService } from './geocoding.service';
import { GithubProfileResponse } from './interfaces/user.interfaces';
import { GithubProfile, UserModel } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private readonly geocodingService: GeocodingService,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @InjectModel(GithubProfile.name)
    private readonly githubModel: Model<GithubProfile>,
  ) {}

  public async create(userDTO: UserDTO) {
    const now = new Date().toISOString();
    let githubProfile = null;
    if (userDTO.githubUsername) {
      githubProfile = await this.prepareGithubProfile(userDTO.githubUsername);
    }

    const createdUser = new this.userModel({
      _id: userDTO.discordUsername,
      avatar: userDTO.avatar,
      bio: userDTO.bio,
      createdOn: now,
      lastModifiedOn: now,
      github: githubProfile,
    });

    return await createdUser.save();
  }

  public async findAll() {
    return await this.userModel.find();
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

  private async prepareGithubProfile(username: string) {
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
      asdf: 'test',
    });
    await createdGithubProfile.save();
    return createdGithubProfile;
  }
}
