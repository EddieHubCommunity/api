import { Connection } from "mongoose";

export default class Context {
  public app;
  public response;
  public preRequest;
  public headers: { [field: string]: string } = {};
  public token;
  public connection: Connection
  public documentId: string;

  public tableToObject(table) {
    return table.rawTable.reduce((result, current) => {
      result[current[0] as string] = JSON.parse(current[1]);
      return result;
    }, {});
  }

  public tableToArray(table) {
    return table.rawTable.map((item) => item[0]);
  }
}
