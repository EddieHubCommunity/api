import { binding, given, when, before } from 'cucumber-tsflow';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { exec } from 'child_process';
import { AppModule } from '../../src/app.module';
import Context from '../support/world';
import { ValidationPipe } from '@nestjs/common';
import { BeforeAll } from 'cucumber';

BeforeAll(async () => {
  if (process.env.STARGATE_BASEURL) {
    await new Promise((resolve) => {
      exec('npm run delete:keyspace', (error, stdout, stderr) => {
        if (error) {
          console.warn(error);
        }
        resolve(stdout ? stdout : stderr);
      });
    });
    await new Promise((resolve) => {
      exec('npm run prestart', (error, stdout, stderr) => {
        if (error) {
          console.warn(error);
        }
        resolve(stdout ? stdout : stderr);
      });
    });
  }
});
@binding([Context])
export class requests {
  constructor(protected context: Context) {}

  private prepareURL(url: string): string {
    if (/\/{id}/.test(url)) {
      url = url.replace(/{id}/, this.context.documentId);
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

  @given(/authorisation/)
  public async authorisation() {
    this.context.token = 'abc';
  }

  @given(/make a GET request to "([^"]*)"/)
  public async getRequest(url: string) {
    url = this.prepareURL(url);
    this.context.response = await request(this.context.app.getHttpServer()).get(
      url,
    );
  }

  @given(/make a POST request to "([^"]*)" with:/)
  public async postRequestWithBody(url: string, table: { rawTable: [] }) {
    url = this.prepareURL(url);

    const post = request(this.context.app.getHttpServer()).post(url);

    if (this.context.token) {
      post.set('Client-Token', this.context.token);
    }

    this.context.response = await post.send(this.context.tableToObject(table));

    this.context.preRequest = await request(
      this.context.app.getHttpServer(),
    ).get(url);
  }

  @when(/set header "([^"]*)" with value "([^"]*)"/)
  public async setHeader(field: string, value: string) {
    const headerObject = {};
    headerObject[field] = value;
    this.context.headers = { ...this.context.headers, ...headerObject };
  }

  @when(/make a PUT request to "([^"]*)" with:/)
  public async putRequest(url: string, table: { rawTable: [] }) {
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
}
