import { binding, given, when, before } from 'cucumber-tsflow';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import Context from '../support/world';
import { ValidationPipe } from '@nestjs/common';

@binding([Context])
export class requests {
  constructor(protected context: Context) {}

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
    this.context.response = await request(this.context.app.getHttpServer()).get(
      url,
    );
  }

  @given(/make a POST request to "([^"]*)" with:/)
  public async postRequestWithBody(url: string, table: { rawTable: [] }) {
    const post = request(this.context.app.getHttpServer()).post(url);

    if (this.context.token) {
      post.set('token', this.context.token);
    }

    this.context.response = await post.send(this.context.tableToObject(table));

    this.context.preRequest = await request(
      this.context.app.getHttpServer(),
    ).get(url);
  }

  @when(/make a PUT request to "([^"]*)" with:/)
  public async putRequest(url: string, table: { rawTable: [] }) {
    const putReq = request(this.context.app.getHttpServer()).put(url);

    if (this.context.token) {
      putReq.set('token', this.context.token);
    }

    this.context.response = await putReq.send(
      this.context.tableToObject(table),
    );
  }

  @when(/make a DELETE request to "([^"]*)"/)
  public async deleteRequest(url: string) {
    const deleteReq = request(this.context.app.getHttpServer()).delete(url);

    if (this.context.token) {
      deleteReq.set('token', this.context.token);
    }

    this.context.response = await deleteReq.send();
  }
}
