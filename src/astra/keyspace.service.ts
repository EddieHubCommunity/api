import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeyspaceService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  private getUrl(): string {
    const databaseId = this.config.get('ASTRA_DATABASE_ID');
    const databaseRegion = this.config.get('ASTRA_DATABASE_REGION');
    const baseUrl = this.config.get('STARGATE_BASEURL');
    let url: string = null;

    if (databaseId && databaseRegion)
      url = `https://${databaseId}-${databaseRegion}.apps.astra.datastax.com/api/rest`;
    if (baseUrl) url = baseUrl;

    if (!url) throw new Error('could not return Url');
    return url;
  }

  private async getAuthToken(): Promise<string> {
    const astraToken = this.config.get('ASTRA_APPLICATION_TOKEN');
    const stargateToken = this.config.get('STARGATE_AUTH_TOKEN');
    const authUrl = this.config.get('STARGATE_AUTH_URL');

    if (astraToken) return astraToken;
    if (stargateToken) return stargateToken;
    if (authUrl) {
      const response = await this.http
        .post(authUrl, {
          username: this.config.get('STARGATE_USERNAME'),
          password: this.config.get('STARGATE_PASSWORD'),
        })
        .toPromise();
      return response.data.authToken;
    }
    throw new Error('Could not return AuthToken');
  }

  public async createKeyspace(serverId: string): Promise<void> {
    const authToken: string = await this.getAuthToken();
    const url = `${this.getUrl()}/v2/schemas/keyspaces`;
    const postBody = { name: serverId };

    if (!this.config.get('ASTRA_DATABASE_ID')) {
      await this.http
        .post(url, postBody, {
          headers: {
            'X-Cassandra-Token': authToken,
            'Content-Type': 'application/json',
          },
        })
        .toPromise();
    }
  }
}
