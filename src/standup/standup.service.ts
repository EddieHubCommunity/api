import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from '../auth/author-headers';
import { StandupDTO } from './dto/standup.dto';
import { Standup } from './schemas/standup.schema';

@Injectable()
export class StandupService {
  constructor(@InjectModel(Standup.name) private readonly standUpModel: Model<Standup>) { }

  async createStandup(createStandUpDTO: StandupDTO): Promise<Standup & { _id: any; }> {
    const createdStandup = new this.standUpModel(createStandUpDTO);
    return createdStandup.save()
  }

  async getAllStandups(): Promise<(Standup & { _id: any; })[]> {
    return await this.standUpModel.find();
  }

  async searchStandupsByUID(uid: string) {
    return await this.standUpModel.find({ 'author.uid': uid })
  }

  async getStandupByID(id: string) {
    return await this.standUpModel.findById(id)
  }

  async deteleStanupByID(id: string, author: Author) {
    let existingStandup = null;
    try {
      existingStandup = await this.standUpModel.findById(id)
    } catch (error) {
      console.log(error)
      throw new HttpException("Standup not Found", HttpStatus.NOT_FOUND)
    }
    if (existingStandup.author.uid != author.uid || existingStandup.author.platform != author.platform) throw new HttpException("Wrong Author", HttpStatus.BAD_REQUEST)
    return await this.standUpModel.findByIdAndDelete(id)
  }
}
