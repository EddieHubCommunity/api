import { binding, given, then, when, before } from 'cucumber-tsflow';
import { assert, expect } from 'chai';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

class Context {
  public app;
  public response;
  public preRequest;
}

@binding([Context])
export class responses {
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

  @given(/make a POST request to "([^"]*)"/)
  public async postRequestWithBody(url: string) {
    this.context.response = await request(this.context.app.getHttpServer())
      .post(url)
      .send({
        username: 'khattakdev',
        bio: {
          description: 'This is a GitHub Campus Expert 🚩',
          twitter: 'khattakdev',
          linkedin: 'khattakdev',
          github: 'khattakdev',
        },
      });

    this.context.preRequest = await request(
      this.context.app.getHttpServer(),
    ).get(url);
  }

  @given(/make a POST request without body to "([^"]*)"/)
  public async postRequest(url: string) {
    this.context.response = await request(
      this.context.app.getHttpServer(),
    ).post(url);
  }

  @when(/make a PUT request to "([^"]*)" with an ID/)
  public async putRequest(url: string) {
    const user = this.context.preRequest.body[0];
    this.context.response = await request(this.context.app.getHttpServer())
      .put(url + `/${user.id}`)
      .send({
        bio: {
          description: 'This is Campus Expert 🚩 from Pakistan',
        },
      });
  }

  @when(/make a DELETE request to "([^"]*)" with an ID/)
  public async deleteRequest(url: string) {
    const user = this.context.preRequest.body[0];
    this.context.response = await request(
      this.context.app.getHttpServer(),
    ).delete(url + `/${user.id}`);
  }

  @then(/the response status code should be "([^"]*)"/)
  public statusResponse(status: string) {
    assert.equal(this.context.response.status, status);
  }

  @then(/the response should be "([^"]*)"/)
  @then(/the response should contains:/)
  public dataResponse(data: string) {
    expect(this.context.response.body, data);
  }
}
