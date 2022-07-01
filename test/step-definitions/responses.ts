import { ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { after, before, binding, then } from 'cucumber-tsflow';
import { AppModule } from '../../src/app.module';
import { getRegex } from '../support/regexes';
import Context from '../support/world';
import { Types } from 'mongoose';

@binding([Context])
export class responses {
  constructor(protected context: Context) {}

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

  @then(
    /the response status code should be (200|201|204|400|401|403|404|413|500|503)/,
  )
  public statusResponse(status: string) {
    expect(this.context.response.status).to.equal(parseInt(status));
  }

  @then(/the response should be "([^"]*)"/)
  public dataResponse(data: string) {
    expect(this.context.response.text).to.equal(data);
  }

  @then(/the response should contain:/)
  public dataResponseTable(table: { rawTable: [] }) {
    const data = this.context.tableToObject(table);
    Object.keys(data).forEach((key) => {
      if (/TYPE:/.test(data[key])) {
        switch (data[key]) {
          case 'TYPE:ID':
            const isValidID = Types.ObjectId.isValid(
              JSON.parse(this.context.response.text)[key],
            );
            this.context.documentId = JSON.parse(this.context.response.text)[
              key
            ];
            expect(isValidID).to.be.true;
            break;
          default:
            const regex = getRegex(data[key]);
            expect(JSON.parse(this.context.response.text)[key]).to.match(regex);
            break;
        }
      } else {
        expect(JSON.parse(this.context.response.text)[key]).to.eql(data[key]);
      }
    });
  }

  @then(/the response-text should contain "([^"]*)"/)
  public validateAPIVersion(text: string) {
    const responseString = this.context.response.text;
    if (/TYPE:/.test(text)) {
      const regex = getRegex(text);
      expect(responseString).to.match(regex);
      return;
    }
    expect(responseString).to.equal(text);
  }

  @then(/the response at index "([^"]*)" should contain:/)
  public validateArrayIndex(index: number, table: { rawTable: [] }) {
    const data = this.context.tableToObject(table);
    Object.keys(data).forEach((key) => {
      if (/TYPE:/.test(data[key])) {
        switch (data[key]) {
          case 'TYPE:ID':
            const isValidID = Types.ObjectId.isValid(
              JSON.parse(this.context.response.text)[index][key],
            );
            this.context.documentId = JSON.parse(this.context.response.text)[
              index
            ][key];
            expect(isValidID).to.be.true;
            break;
          default:
            const regex = getRegex(data[key]);
            expect(JSON.parse(this.context.response.text)[index][key]).to.match(
              regex,
            );
            break;
        }
      } else {
        expect(JSON.parse(this.context.response.text)[index][key]).to.eql(
          data[key],
        );
      }
    });
  }

  @then(/the reponse in property "([^"]*)" at index "([^"]*)" should contain:/)
  public validateResponseProperty(
    property: string,
    index: string,
    table: { rawTable: [] },
  ) {
    const data = this.context.tableToObject(table);
    Object.keys(data).forEach((key) => {
      if (/TYPE:/.test(data[key])) {
        switch (data[key]) {
          case 'TYPE:ID':
            const isValidID = Types.ObjectId.isValid(
              JSON.parse(this.context.response.text)[property][index][key],
            );
            this.context.documentId = JSON.parse(this.context.response.text)[
              property
            ][index][key];
            expect(isValidID).to.be.true;
            break;
          default:
            const regex = getRegex(data[key]);
            expect(
              JSON.parse(this.context.response.text)[property][index][key],
            ).to.match(regex);
            break;
        }
      } else {
        expect(
          JSON.parse(this.context.response.text)[property][index][key],
        ).to.eql(data[key]);
      }
    });
  }
}
