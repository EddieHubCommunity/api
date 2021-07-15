export interface TokenPayload {
  clientId: string;
  keyspace: string;
  serverId: string;
  scopes: string[];
}

export enum ScopesDictionary {
  READ = 'Data.Read',
  WRITE = 'Data.Write',
}
