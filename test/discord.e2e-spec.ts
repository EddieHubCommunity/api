import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/Discord (Get All Users) should return 200', () => {
    return request(app.getHttpServer()).get('/discord').expect(200);
  });

  it('/Discord (Get All Users) should return an array of users', () => {
    return request(app.getHttpServer())
      .get('/discord')
      .expect(200)
      .expect([
        {
          id: 1613291638892,
          username: 'eddiejaoude',
          bio: {
            description: 'This is a GitHub Star ⭐',
            twitter: 'eddiejaoude',
            linkedin: 'eddiejaoude',
            github: 'eddiejaoude',
          },
          createdOn: '2021-02-14T08:33:58.892Z',
          updatedOn: '2021-02-14T08:33:58.892Z',
        },
      ]);
  });

  it('/Discord (Add New User)', async () => {
    return request(app.getHttpServer())
      .post('/discord')
      .send({
        username: 'khattakdev',
        bio: {
          description: 'This is a GitHub Campus Expert 🚩',
          twitter: 'khattakdev',
          linkedin: 'khattakdev',
          github: 'khattakdev',
        },
      })
      .expect(201)
      .expect('User added successfully!');
  });

  it('/Discord (Update User)', () => {
    return request(app.getHttpServer())
      .put('/discord/1613291638892')
      .send({
        bio: {
          description: 'This is Campus Expert 🚩 from Pakistan',
        },
      })
      .expect(200)
      .expect('User updated successfully!');
  });

  it('/Discord (Remove User)', () => {
    return request(app.getHttpServer())
      .delete('/discord/1613291638892')
      .expect(200)
      .expect('User deleted successfully!');
  });

  it('/Discord (Find User)', () => {
    return request(app.getHttpServer())
      .get('/discord/1613291638892')
      .expect(200)
      .expect({
        id: 1613291638892,
        username: 'eddiejaoude',
        bio: {
          description: 'This is a GitHub Star ⭐',
          twitter: 'eddiejaoude',
          linkedin: 'eddiejaoude',
          github: 'eddiejaoude',
        },
        createdOn: '2021-02-14T08:33:58.892Z',
        updatedOn: '2021-02-14T08:33:58.892Z',
      });
  });
});
