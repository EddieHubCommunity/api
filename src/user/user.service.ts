import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GithubProfileModel } from '../github-profile/schema/github-profile.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { PatchUserDTO } from './dto/patch-user.dto';
import { UserModel } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @InjectModel(GithubProfileModel.name)
    private readonly githubModel: Model<GithubProfileModel>,
  ) {}

  public async create(userDTO: CreateUserDTO) {
    const githubProfile = null;

    const createdUser = new this.userModel({
      _id: userDTO.discordUsername,
      avatar: userDTO.avatar,
      bio: userDTO.bio,
      github: githubProfile?._id.toString(),
    });

    try {
      const newUser = await createdUser.save();
      return await newUser.populate('github', '-__v');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async patch(userDTO: PatchUserDTO, id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const patchDocument = {
      avatar: userDTO.avatar,
      bio: userDTO.bio,
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
    return await this.userModel.find().populate('github', '-__v');
  }

  public async findOne(id: string) {
    const user = await this.userModel.findById(id).populate('github', '-__v');
    if (!user) {
      throw new HttpException(
        `No Document for ${id} found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  public async delete(id: string) {
    try {
      const existingDoc = await this.userModel.findById(id);
      await this.githubModel.findByIdAndDelete(existingDoc.github);
      return await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(
        `No Document for ${id} found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
