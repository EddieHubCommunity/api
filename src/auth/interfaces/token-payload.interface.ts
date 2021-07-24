export interface TokenPayload {
  clientId: string;
  keyspace: string;
  scopes: string[];
  tokenType: string;
}

export enum ScopesDictionary {
  READ = 'Data.Read',
  WRITE = 'Data.Write',
}
