import { binding, given, when, before } from 'cucumber-tsflow';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import Context from '../support/world';

@binding([Context])
export class requests {
  constructor(protected context: Context) {}

  @before()
  public async before(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.context.app = moduleFixture.createNestApplication();
    await this.context.app.init();
  }

  @given(/make a GET request to "([^"]*)"/)
  public async getRequest(url: string) {
    this.context.response = await request(this.context.app.getHttpServer()).get(
      url,
    );
  }

  @given(/make a POST request to "([^"]*)" with:/)
  public async postRequestWithBody(url: string, table: { rawTable: [] }) {
    this.context.response = await request(this.context.app.getHttpServer())
      .post(url)
      .send(this.context.tableToObject(table));

    this.context.preRequest = await request(
      this.context.app.getHttpServer(),
    ).get(url);
  }

  @when(/make a PUT request to "([^"]*)" with:/)
  public async putRequest(url: string, table: { rawTable: [] }) {
    this.context.response = await request(this.context.app.getHttpServer())
      .put(url)
      .send(this.context.tableToObject(table));
  }

  @when(/make a DELETE request to "([^"]*)"/)
  public async deleteRequest(url: string) {
    this.context.response = await request(
      this.context.app.getHttpServer(),
    ).delete(url);
  }
}
