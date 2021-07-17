import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenPayload } from './interfaces/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  //TODO move configCollection to database => own ConfigDataModule
  private configCollection: { [id: string]: { knownClients: string[] } } = {};
  constructor(private readonly jwtService: JwtService) {}

  public register(body: AuthDTO) {
    const clientId = uuidv4();
    const { serverId, scopes } = body;

    const payload: TokenPayload = {
      clientId,
      keyspace: serverId,
      scopes,
    };
    if (!this.configCollection[serverId]) {
      this.configCollection[serverId] = { knownClients: [] };
    }
    this.configCollection[serverId].knownClients = [
      ...this.configCollection[serverId].knownClients,
      clientId,
    ];
    const signedToken = this.jwtService.sign(payload, { expiresIn: '1y' });
    const decoded: any = this.jwtService.decode(signedToken);
    const expiresIn: number = decoded.exp - Math.round(Date.now() / 1000);
    return { ...payload, accessToken: signedToken, expiresIn };
  }

  public validateClient(payload: TokenPayload): boolean {
    const { keyspace, clientId } = payload;
    if (
      this.configCollection[keyspace] &&
      this.configCollection[keyspace].knownClients.includes(clientId)
    ) {
      return true;
    }
    return false;
  }

  public removeClient(token: string) {
    if (!token)
      throw new HttpException('Please provide token', HttpStatus.BAD_REQUEST);

    const decoded = this.jwtService.decode(token) as TokenPayload;

    try {
      this.configCollection[
        decoded.keyspace
      ].knownClients = this.configCollection[
        decoded.keyspace
      ].knownClients.filter((client) => client !== decoded.clientId);
      console.log(this.configCollection);
      return;
    } catch (e) {
      throw new HttpException('Invalid client id', HttpStatus.BAD_REQUEST);
    }
  }
}
