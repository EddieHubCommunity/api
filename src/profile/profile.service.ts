import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfileDTO } from './dto/profile.dto';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
  ) {}

  public async create(
    createProfileDTO: ProfileDTO,
  ): Promise<Profile & { _id: any }> {
    const createdProfile = new this.profileModel({
      ...createProfileDTO,
      ...{
        createdOn: new Date().toISOString(),
        _id: createProfileDTO.githubUsername,
      },
    });
    try {
      return await createdProfile.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async findByID(id: string) {
    if (!id)
      throw new HttpException('Please provide an ID', HttpStatus.BAD_REQUEST);
    return await this.profileModel.findById(id);
  }
}
