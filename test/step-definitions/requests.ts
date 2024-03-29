import { ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { after, before, binding, given, when } from 'cucumber-tsflow';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import Context from '../support/world';

setDefaultTimeout(60 * 1000);

@binding([Context])
export class requests {
  constructor(protected context: Context) {}

  private prepareURL(url: string): string {
    if (/{id}/.test(url)) {
      url = url.replace(/{id}/, this.context.documentId);
    }
    return url;
  }

  @after()
  public async after(): Promise<void> {
    await this.context.connection.close();
  }

  @before()
  public async before(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.context.app = moduleFixture.createNestApplication();
    this.context.app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await this.context.app.init();
    this.context.connection = await this.context.app.get(getConnectionToken());
    await this.context.connection.dropDatabase();
  }

  @when(/restart app/)
  public async restartApp(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.context.app = moduleFixture.createNestApplication();
    this.context.app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await this.context.app.init();
  }

  @given(/^authorization$/)
  public async authorization() {
    this.context.token = 'abc';
  }

  @given(/^invalid authorization$/)
  public async invalidAuthorization() {
    this.context.token = 'xxx';
  }

  @when(/remove authorization/)
  public removeAuth() {
    this.context.token = null;
  }

  @when(/I create a github profile/)
  public async createGithubProfile() {
    const body = {
      githubUsername: 'hubber',
    };
    const post = request(this.context.app.getHttpServer()).post('/github');
    if (this.context.token) {
      post.set('Client-Token', this.context.token);
    }
    return await post.send(body);
  }

  @when(/I create a new user/)
  public async createUser() {
    const body = {
      discordUsername: 'hubber',
      bio: 'My Name is Hubber',
      avatar: 'https://github.com/EddieHubCommunity.png',
    };
    const post = request(this.context.app.getHttpServer()).post('/users');
    if (this.context.token) {
      post.set('Client-Token', this.context.token);
    }
    await post.send(body);
  }

  @given(/make a GET request to "([^"]*)"/)
  public async getRequest(url: string) {
    url = this.prepareURL(url);

    const get = request(this.context.app.getHttpServer()).get(url);

    if (this.context.token) {
      get.set('Client-Token', this.context.token);
    }
    this.context.response = await get.send();
  }

  @given(/make a POST request to "([^"]*)" with:/)
  public async postRequestWithBody(url: string, table: { rawTable: [] }) {
    url = this.prepareURL(url);

    const post = request(this.context.app.getHttpServer()).post(url);
    const body = this.context.tableToObject(table);

    if (this.context.token) {
      post.set('Client-Token', this.context.token);
    }

    this.context.response = await post.send(body);
  }

  @when(/set header "([^"]*)" with value "([^"]*)"/)
  public async setHeader(field: string, value: string) {
    const headerObject = {};
    headerObject[field] = value;
    this.context.headers = { ...this.context.headers, ...headerObject };
  }

  @when(/make a PATCH request to "([^"]*)" with:/)
  public async patchRequest(url: string, table: { rawTable: [] }) {
    url = this.prepareURL(url);
    const putReq = request(this.context.app.getHttpServer()).patch(url);

    if (this.context.token) {
      putReq.set('Client-Token', this.context.token);
    }
    if (this.context.headers) {
      putReq.set(this.context.headers);
    }

    this.context.response = await putReq.send(
      this.context.tableToObject(table),
    );
  }

  @when(/make a DELETE request to "([^"]*)"/)
  public async deleteRequest(url: string) {
    url = this.prepareURL(url);
    const deleteReq = request(this.context.app.getHttpServer()).delete(url);

    if (this.context.token) {
      deleteReq.set('Client-Token', this.context.token);
    }

    if (this.context.headers) {
      deleteReq.set(this.context.headers);
    }

    this.context.response = await deleteReq.send();
  }

  @when(/make a PUT request to "([^"]*)" with:/)
  public async putRequestWithBody(url: string, table: { rawTable: [] }) {
    url = this.prepareURL(url);
    const putReq = request(this.context.app.getHttpServer()).put(url);

    if (this.context.token) {
      putReq.set('Client-Token', this.context.token);
    }

    if (this.context.headers) {
      putReq.set(this.context.headers);
    }

    this.context.response = await putReq.send(
      this.context.tableToObject(table),
    );
  }
}
