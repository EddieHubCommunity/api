import app from '../../src/app';

import faker from 'faker';

describe('\'discord\' service', () => {
  it('registered the service', () => {
    const service = app.service('discord');
    expect(service).toBeTruthy();
  });

  it('create and get users', async () => {
    const username = faker.name.findName();
    const discord = await app.service('discord').create({
      username,
    });

    expect(discord.username).toBe(username);
  });
});
