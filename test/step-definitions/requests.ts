import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { setDefaultTimeout } from 'cucumber';
import { before, binding, given, when } from 'cucumber-tsflow';
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
    if (/{bearer}/.test(url)) {
      url = url.replace(/{bearer}/, this.context.bearerToken);
    }
    return url;
  }

  @before()
  public async before(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.context.app = moduleFixture.createNestApplication();
    this.context.app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await this.context.app.init();
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

  @given(/^authorisation$/)
  public async authorisation() {
    this.context.token = 'abc';
  }

  @given(/^invalid authorisation$/)
  public async invalidAuthorisation() {
    this.context.token = 'xxx';
  }

  @when(/add bearer token to the header/)
  public async addBearerToken() {
    this.context.bearerToken = this.context.response.body.accessToken;
  }

  @given(/make a GET request to "([^"]*)"/)
  public async getRequest(url: string) {
    url = this.prepareURL(url);

    const get = request(this.context.app.getHttpServer()).get(url);

    if (this.context.bearerToken) {
      get.set('Authorization', `Bearer ${this.context.bearerToken}`);
    }

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
    Object.keys(body).forEach((key) => {
      if (/{BEARER}/.test(body[key])) {
        body[key] = this.context.bearerToken;
      }
    });

    if (this.context.token) {
      post.set('Client-Token', this.context.token);
    }

    if (this.context.bearerToken) {
      post.set('Authorization', `Bearer ${this.context.bearerToken}`);
    }
    this.context.response = await post.send(body);
  }

  @when(/clear the bearer token/)
  public clearBearer() {
    this.context.bearerToken = null;
  }

  @when(/set header "([^"]*)" with value "([^"]*)"/)
  public async setHeader(field: string, value: string) {
    const headerObject = {};
    headerObject[field] = value;
    this.context.headers = { ...this.context.headers, ...headerObject };
  }

  @when(/make a Patch request to "([^"]*)" with:/)
  public async putRequest(url: string, table: { rawTable: [] }) {
    url = this.prepareURL(url);
    const putReq = request(this.context.app.getHttpServer()).patch(url);

    if (this.context.token) {
      putReq.set('Client-Token', this.context.token);
    }
    if (this.context.headers) {
      putReq.set(this.context.headers);
    }

    if (this.context.bearerToken) {
      putReq.set('Authorization', `Bearer ${this.context.bearerToken}`);
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

    if (this.context.bearerToken) {
      deleteReq.set('Authorization', `Bearer ${this.context.bearerToken}`);
    }

    this.context.response = await deleteReq.send();
  }
}
