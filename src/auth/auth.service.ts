import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenPayload } from './interfaces/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { AuthDTO } from './dto/auth.dto';
import { AstraService } from '../astra/astra.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly astraService: AstraService,
  ) {}

  public async register(body: AuthDTO) {
    const clientId = uuidv4();
    const { serverId, scopes } = body;
    let tokens: string[] = [];
    try {
      tokens = await this.astraService
        .get<string[]>('tokens', serverId, 'tokens')
        .toPromise();
    } catch (e) {
      tokens = [];
    }

    const payload: TokenPayload = {
      clientId,
      keyspace: serverId,
      scopes,
    };
    tokens = [...tokens, clientId];
    await this.astraService
      .replace('tokens', tokens, serverId, 'tokens')
      .toPromise();
    //TODO token-expiry
    const signedToken = this.jwtService.sign(payload, { expiresIn: '1y' });
    const decoded: any = this.jwtService.decode(signedToken);
    const expiresIn: number = decoded.exp - Math.round(Date.now() / 1000);
    return { ...payload, accessToken: signedToken, expiresIn };
  }

  public async validateClient(payload: TokenPayload): Promise<boolean> {
    const { keyspace, clientId } = payload;
    let tokens: string[];
    try {
      tokens = await this.astraService
        .get<string[]>('tokens', keyspace, 'tokens')
        .toPromise();
    } catch {
      return false;
    }
    if (tokens && tokens.includes(clientId)) {
      return true;
    }
    return false;
  }

  public async removeClient(token: string): Promise<boolean> {
    let tokens: string[] = null;
    if (!token)
      throw new HttpException('Please provide token', HttpStatus.BAD_REQUEST);

    const decoded = this.jwtService.decode(token) as TokenPayload;

    try {
      tokens = await this.astraService
        .get<string[]>('tokens', decoded.keyspace, 'tokens')
        .toPromise();
    } catch (e) {
      return;
    }

    tokens = tokens.filter((clientID) => clientID !== decoded.clientId);
    try {
      await this.astraService
        .replace('tokens', tokens, decoded.keyspace, 'tokens')
        .toPromise();
    } catch (e) {
      throw new HttpException(
        'Deleting Token went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return;
  }
}
