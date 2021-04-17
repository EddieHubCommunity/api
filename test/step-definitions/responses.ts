import { binding, then, before } from 'cucumber-tsflow';
import { expect } from 'chai';
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

  @then(/the response status code should be (200|201|400|404|413|500|503)/)
  public statusResponse(status: string) {
    expect(this.context.response.status).to.equal(parseInt(status));
  }

  @then(/the response should be "([^"]*)"/)
  public dataResponse(data: string) {
    expect(this.context.response.text).to.equal(data);
  }

  @then(/the response should contains:/)
  public dataResponseTable(table: { rawTable: [] }) {
    const data = this.context.tableToObject(table);
    expect(JSON.parse(this.context.response.text)).to.to.eql(data);
  }
}
