import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenPayload } from './interfaces/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  //TODO move configCollection to database => own ConfigDataModule
  private configCollection: { [id: string]: { knownClients: String[] } } = {};
  constructor(private readonly JwtService: JwtService) {}

  public register(serverId: string, keyspace: string): { accessToken: string } {
    const clientId = uuidv4();
    const payload: TokenPayload = {
      clientId,
      keyspace,
      serverId,
    };
    if (!this.configCollection[serverId]) {
      this.configCollection[serverId] = { knownClients: [] };
    }
    this.configCollection[serverId].knownClients = [
      ...this.configCollection[serverId].knownClients,
      clientId,
    ];
    const signedToken = this.JwtService.sign(payload);
    console.log(JSON.stringify(payload));
    console.log(this.configCollection);
    return { accessToken: signedToken };
  }

  public validateClient(payload: TokenPayload): boolean {
    const { serverId, clientId } = payload;
    if (
      this.configCollection[serverId] &&
      this.configCollection[serverId].knownClients.includes(clientId)
    ) {
      return true;
    }
    return false;
  }

  public removeClient(token: string) {
    if (!token)
      throw new HttpException('Please provide token', HttpStatus.BAD_REQUEST);

    const decoded = this.JwtService.decode(token) as TokenPayload;

    try {
      this.configCollection[
        decoded.serverId
      ].knownClients = this.configCollection[
        decoded.serverId
      ].knownClients.filter((client) => client !== decoded.clientId);
      console.log(this.configCollection);
      return;
    } catch (e) {
      throw new HttpException('Invalid client id', HttpStatus.BAD_REQUEST);
    }
  }
}
