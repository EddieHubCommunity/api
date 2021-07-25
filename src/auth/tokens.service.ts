import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenPayload } from './interfaces/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { AuthDTO } from './dto/auth.dto';
import { AstraService } from '../astra/astra.service';
import { catchError } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly astraService: AstraService,
  ) {}

  public async findAll(keyspace: string) {
    return this.astraService
      .find<AuthDTO>(keyspace, 'tokens')
      .pipe(catchError(() => from([{}])));
  }

  public register(body: AuthDTO) {
    const clientId = uuidv4();
    const { serverId, scopes } = body;

    const payload: TokenPayload = {
      clientId,
      keyspace: serverId,
      scopes,
    };

    //TODO token-expiry
    const signedToken = this.jwtService.sign(payload, { expiresIn: '1y' });
    const decoded: any = this.jwtService.decode(signedToken);
    const expiresIn: number = decoded.exp - Math.round(Date.now() / 1000);
    const response = { ...payload, accessToken: signedToken, expiresIn };

    this.astraService.create(response, serverId, 'tokens');

    return response;
  }

  public async validateClient(payload: TokenPayload): Promise<boolean> {
    const { keyspace, clientId } = payload;

    try {
      const token = await this.astraService.findOne(
        { clientId: { $eq: clientId } },
        keyspace,
        'tokens',
      );
      if (token) {
        return true;
      }
    } catch (e) {
      return false;
    }

    return false;
  }

  public async removeClient(token: string) {
    if (!token)
      throw new HttpException('Please provide token', HttpStatus.BAD_REQUEST);

    const { clientId, keyspace } = this.jwtService.decode(
      token,
    ) as TokenPayload;

    try {
      await this.astraService.delete(clientId, keyspace, 'tokens');
    } catch (e) {
      throw new HttpException('Invalid client id', HttpStatus.BAD_REQUEST);
    }

    return;
  }
}
