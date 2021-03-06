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

  @given(/make a POST request to "([^"]*)"/)
  public async postRequestWithBody(url: string) {
    this.context.response = await request(this.context.app.getHttpServer())
      .post(url)
      .send({
        username: 'khattakdev',
        bio: 'This is a GitHub Campus Expert 🚩',
        socials: {
          discord: 'khattakdev',
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
        bio: 'This is Campus Expert 🚩 from Pakistan',
      });
  }

  @when(/make a DELETE request to "([^"]*)" with an ID/)
  public async deleteRequest(url: string) {
    const user = this.context.preRequest.body[0];
    this.context.response = await request(
      this.context.app.getHttpServer(),
    ).delete(url + `/${user.id}`);
  }
}
