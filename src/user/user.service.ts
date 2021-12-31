import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import { GithubProfileService } from './github-profile.service';
import { UserModel } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly githubProfileService: GithubProfileService,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  public async create(userDTO: UserDTO) {
    const now = new Date().toISOString();
    let githubProfile = null;
    if (userDTO.githubUsername) {
      githubProfile = await this.githubProfileService.create(
        userDTO.githubUsername,
      );
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
}
