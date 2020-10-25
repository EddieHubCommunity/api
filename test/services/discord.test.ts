import app from '../../src/app';

describe('\'discord\' service', () => {
  it('registered the service', () => {
    const service = app.service('discord');
    expect(service).toBeTruthy();
  });

  it('create and get users', async () => {
    const username = 'Test 1';
    const discord = await app.service('discord').create({
      username,
    });

    expect(discord.username).toBe(username);
  });
});
