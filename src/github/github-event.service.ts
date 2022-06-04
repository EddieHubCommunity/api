import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject } from 'rxjs';
import { GithubEventModel } from './schema/github-event.schema';

@Injectable()
export class GithubEventService {
  constructor(
    @InjectModel(GithubEventModel.name)
    private readonly eventModel: Model<GithubEventModel>,
  ) {}

  /**
   * An RXJS Subject that may act as a bridge, e.g. between Controller(s) and Gateway(s)
   */
  private readonly eventSubject = new Subject();

  public readonly eventObservable = this.eventSubject.asObservable();

  public emitEvent(event): void {
    this.eventSubject.next(event);
  }

  public async create(githubUsername: string, event: string) {
    const newEvent = new this.eventModel({
      githubUsername,
      event,
    });
    return await newEvent.save();
  }

  public async getAllPopulated() {
    return await this.eventModel.find().populate('githubUsername', '-__v');
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
