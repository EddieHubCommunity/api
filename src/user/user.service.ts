import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { PatchUserDTO } from './dto/patch-user.dto';
import { GithubProfileService } from './github-profile.service';
import { UserModel } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly githubProfileService: GithubProfileService,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  public async create(userDTO: CreateUserDTO) {
    let githubProfile = null;
    if (userDTO.githubUsername) {
      githubProfile = await this.githubProfileService.create(
        userDTO.githubUsername,
      );
    }

    const createdUser = new this.userModel({
      _id: userDTO.discordUsername,
      avatar: userDTO.avatar,
      type: userDTO.type,
      bio: userDTO.bio,
      github: githubProfile?._id.toString(),
    });

    try {
      return await createdUser.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async patch(userDTO: PatchUserDTO, id: string) {
    let githubProfile = null;
    if (userDTO.githubUsername) {
      githubProfile = await this.githubProfileService.create(
        userDTO.githubUsername,
      );
    }
    const patchDocument = {
      avatar: userDTO.avatar,
      bio: userDTO.bio,
      type: userDTO.type,
      github: githubProfile,
    };

    Object.keys(patchDocument).forEach((key) => {
      if (patchDocument[key] === null) {
        delete patchDocument[key];
      }
    });

    return await this.userModel.findByIdAndUpdate(
      id,
      {
        $set: patchDocument,
        $inc: { __v: 1 },
      },
      { new: true },
    );
  }

  public async findAll() {
    return await this.userModel.find().populate('github');
  }

  public async findOne(id: string) {
    return await this.userModel.findById(id).populate('github');
  }

  public async delete(id: string) {
    try {
      await this.userModel.findById(id);
      return await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(
        `No Document for ${id} found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
