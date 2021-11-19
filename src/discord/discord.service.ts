import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiscordDTO } from './dto/discord.dto';
import { Discord } from './schemas/discord.schema';
@Injectable()
export class DiscordService {
  constructor(
    @InjectModel(Discord.name) private readonly DiscordModel: Model<Discord>,
  ) {}

  public async create(createDiscordDto: DiscordDTO) {
    const newDiscord = new this.DiscordModel({
      ...createDiscordDto,
      ...{
        _id: createDiscordDto.discordUID,
        createdOn: new Date().toISOString(),
        lastModifiedOn: new Date().toISOString(),
      },
    });
    try {
      return await newDiscord.save();
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll() {
    return await this.DiscordModel.find();
  }

  async searchByID(uid: string) {
    if (!uid)
      throw new HttpException(
        'Please provide search context',
        HttpStatus.BAD_REQUEST,
      );
    return await this.DiscordModel.findById(uid);
  }
}
