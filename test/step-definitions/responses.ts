import { ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { after, before, binding, then } from 'cucumber-tsflow';
import { AppModule } from '../../src/app.module';
import { getRegex } from '../support/regexes';
import Context from '../support/world';

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

  @then(/the response in property "([^"]*)" should contain:/)
  public dataResponseItemTable(item: number, table: { rawTable: [] }) {
    const data = this.context.tableToObject(table);
    Object.keys(data).forEach((key) => {
      if (/TYPE:/.test(data[key])) {
        const regex = getRegex(data[key]);
        expect(JSON.parse(this.context.response.text)[item][key]).to.match(
          regex,
        );
      } else {
        expect(JSON.parse(this.context.response.text)[item][key]).to.eql(
          data[key],
        );
      }
    });
  }

  @then(/the response in property "([^"]*)" and item "([^"]*)" should contain:/)
  public dataResponsePropertyItemTable(
    property: string,
    item: number,
    table: { rawTable: [] },
  ) {
    const data = this.context.tableToObject(table);
    Object.keys(data).forEach((key) => {
      if (/TYPE:/.test(data[key])) {
        const regex = getRegex(data[key]);
        expect(
          JSON.parse(this.context.response.text)[property][item][key],
        ).to.match(regex);
      } else {
        expect(
          JSON.parse(this.context.response.text)[property][item][key],
        ).to.eql(data[key]);
      }
    });
  }

  @then(/the response property "([^"]*)" has items:/)
  public dataResponsePropertyTable(property: string, table: { rawTable: [] }) {
    const data = this.context.tableToArray(table);
    expect(JSON.parse(this.context.response.text)[property]).to.eql(data);
  }

  @then(/the response should contain:/)
  public dataResponseTable(table: { rawTable: [] }) {
    const data = this.context.tableToObject(table);
    Object.keys(data).forEach((key) => {
      if (/TYPE:/.test(data[key])) {
        if (data[key] === 'TYPE:ID') {
          this.context.documentId = JSON.parse(this.context.response.text)[key];
        }
        const regex = getRegex(data[key]);
        expect(JSON.parse(this.context.response.text)[key]).to.match(regex);
      } else {
        expect(JSON.parse(this.context.response.text)[key]).to.eql(data[key]);
      }
    });
  }

  @then(
    /the response in item where field "([^"]*)" is equal to "([^"]*)" should contain:/,
  )
  public dataResponseFieldInItem(
    field: string,
    value: string,
    table: { rawTable: [] },
  ) {
    const data = this.context.tableToObject(table);
    const workObject = Object.values(
      JSON.parse(this.context.response.text),
    ).find((el) => el[field] === value);
    Object.keys(data).forEach((key) => {
      if (/TYPE:/.test(data[key])) {
        const regex = getRegex(data[key]);
        expect(workObject[key]).to.match(regex);
      } else {
        expect(workObject[key]).to.eql(data[key]);
      }
    });
  }

  @then(
    /the response in item where property "([^"]*)" has a subobject "([^"]*)" which contains a field that is equal to "([^"]*)" should contain:/,
  )
  public unknownResponseNestedProperty(
    property: string,
    subproperty: string,
    value: string,
    table: { rawTable: [] },
  ) {
    const data = this.context.tableToObject(table);
    const workObject = Object.values(
      JSON.parse(this.context.response.text),
    ).find((el) => el[property][subproperty] === value);
    Object.keys(data).forEach((key) => {
      if (/TYPE:/.test(data[key])) {
        const regex = getRegex(data[key]);
        expect(workObject[key]).to.match(regex);
      } else {
        expect(workObject[key]).to.eql(data[key]);
      }
    });
  }

  @then(
    /the response property "([^"]*)" has a subobject with a field "([^"]*)" that is equal to "([^"]*)" should contain:/,
  )
  public dataResponseNestedProperty(
    propertyString: string,
    field: string,
    value: string,
    table: { rawTable: [] },
  ) {
    const data = this.context.tableToObject(table);
    const topProperty = JSON.parse(this.context.response.text)[propertyString];

    const workObject = Object.values(topProperty).find(
      (element) => element[field] === value,
    );

    Object.keys(data).forEach((key) => {
      if (/TYPE:/.test(data[key])) {
        const regex = getRegex(data[key]);
        expect(workObject[key]).to.match(regex);
      } else {
        expect(workObject[key]).to.eql(data[key]);
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

  @then(
    /the response property "([^"]*)" should have a collection of type "([^"]*)"/,
  )
  public validateArrayProperty(property: string, type: string) {
    const responseProperty = JSON.parse(this.context.response.text)[property];
    const regex = getRegex(type);
    if (responseProperty instanceof Array) {
      responseProperty.every((element) => expect(element).to.match(regex));
    }
  }
}
