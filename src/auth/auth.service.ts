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

    const payload: TokenPayload = {
      clientId,
      keyspace: serverId,
      scopes,
    };
    try {
      await this.astraService
        .create({ clientId }, serverId, 'tokens', clientId)
        .toPromise();
    } catch (error) {
      throw new HttpException(
        "Token coundn't be created in the database",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    //TODO token-expiry
    const signedToken = this.jwtService.sign(payload, { expiresIn: '1y' });
    const decoded: any = this.jwtService.decode(signedToken);
    const expiresIn: number = decoded.exp - Math.round(Date.now() / 1000);
    return { ...payload, accessToken: signedToken, expiresIn };
  }

  public async validateClient(payload: TokenPayload): Promise<boolean> {
    const { keyspace, clientId } = payload;
    let token: string = null;
    try {
      token = await this.astraService
        .get<string>(clientId, keyspace, 'tokens')
        .toPromise();
    } catch {
      return false;
    }
    if (!token) {
      return false;
    }
    return true;
  }

  public async removeClient(token: string) {
    let deleteSuccess = false;
    let clientId: string;
    let keyspace: string;

    if (!token)
      throw new HttpException('Please provide token', HttpStatus.BAD_REQUEST);
    try {
      ({ clientId, keyspace } = this.jwtService.verify<TokenPayload>(token));
    } catch (error) {
      throw new HttpException(
        "Token couldn't be verified",
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      await this.astraService.delete(clientId, keyspace, 'tokens').toPromise();
      deleteSuccess = true;
    } catch (error) {
      throw new Error("Token couldn't be deleted");
    }

    return deleteSuccess;
  }

  public async getClientIds(keyspace: string) {
    let clients;
    try {
      clients = await this.astraService.find(keyspace, 'tokens').toPromise();
    } catch (error) {
      throw new HttpException(
        'Clients couldnt be retrieved',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { clients: Object.keys(clients) };
  }

  public validateToken(token: string) {
    try {
      this.jwtService.verify(token);
      return { valid: true };
    } catch (error) {
      return { valid: false };
    }
  }
}
