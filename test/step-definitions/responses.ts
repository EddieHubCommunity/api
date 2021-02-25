import { binding, then, when, before} from 'cucumber-tsflow';
import { assert, expect } from 'chai';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

class Context {
  public app;
  public response;
}

// tslint:disable-next-line:max-classes-per-file
@binding([Context])
export class HelloWorldSteps {
  constructor(protected context: Context) {}

  @before()
  public async before(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.context.app = moduleFixture.createNestApplication();
    await this.context.app.init();
  }

  @when(/make a GET Request to "([^"]*)"/)
  public async callToGETAPI(url: string) {
    this.context.response = await request(this.context.app.getHttpServer())
      .get(url);
  }

  @when(/make a POST Request to "([^"]*)"/)
  public async callToPOSTAPI(url: string) {
    this.context.response = await request(this.context.app.getHttpServer())
      .post(url);
  }

  @then(/the response status code should be "([^"]*)"/)
  public statusResponse(status: string) {
    assert.equal(this.context.response.status, status);
  }

  @then(/the response should be "([^"]*)"/)
  public dataResponse(data: string) {

    assert.equal(this.context.response.text, data);
  }
}
