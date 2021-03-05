import { binding, then, before } from 'cucumber-tsflow';
import { assert, expect } from 'chai';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import Context from '../support/world';

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
