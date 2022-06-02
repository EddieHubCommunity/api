import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GithubEventModel } from './schema/github-event.schema';

@Injectable()
export class GithubEventService {
  constructor(
    @InjectModel(GithubEventModel.name)
    private readonly eventModel: Model<GithubEventModel>,
  ) {}

  public async create(githubUsername: string, event: string) {
    const newEvent = new this.eventModel({
      githubUsername,
      event,
    });
    return await newEvent.save();
  }

  public async getAll() {
    return await this.eventModel.find();
  }

  public async getOne(id: string) {
    return await this.eventModel.findById(id);
  }

  public async getByUsername(githubUsername: string) {
    return await this.eventModel.find({ githubUsername });
  }

  public async deleteByUsername(githubUsername: string) {
    return await this.eventModel.deleteMany({ githubUsername });
  }
}
