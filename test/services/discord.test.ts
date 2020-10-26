import app from '../../src/app';
import { Paginated } from '@feathersjs/feathers';

import faker from 'faker';
import { DiscordModel } from '../../src/models/discord.model';

describe('\'discord\' service', () => {
  it('registered the service', () => {
    const service = app.service('discord');
    expect(service).toBeTruthy();
  });

  it('create user', async () => {
    const username = faker.name.findName();
    const user = await app.service('discord').create({ username });

    expect(user.username).toBe(username);
  });

  it('find users by username', async () => {
    const username = faker.name.findName();
    await app.service('discord').create({ username });
    const user = <Paginated<DiscordModel>> await app.service('discord').find({ query: { username }});

    expect(user.data[0].username).toBe(username);
  });
});
