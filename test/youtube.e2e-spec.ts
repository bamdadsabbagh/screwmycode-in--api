import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { YoutubeModule } from '../src/domains/youtube/youtube.module';
import { youtubeConstants } from './youtube.constants';

describe('YoutubeController (e2e)', () => {
  let server;
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, YoutubeModule],
    }).compile();

    app = module.createNestApplication();
    server = app.getHttpServer();
    await app.init();
  });

  it('@Get /youtube should succeed', async () => {
    const response = await request(server).get('/youtube');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('@Get /youtube/UY6dvVeuzk4 should succeed', async () => {
    const response = await request(server).get(
      `/youtube/${youtubeConstants.id.valid[0]}`,
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.title).toBeDefined();
    expect(response.body.data.url).toBeDefined();
    expect(response.body.data.hits).toBeDefined();
    expect(response.body.error).toBeUndefined();
  });

  it('@Get /youtube/q3WzYdFyAqc should fail', async () => {
    const response = await request(server).get(
      `/youtube/${youtubeConstants.id.notValid[0]}`,
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeDefined();
    expect(response.body.error.message).toBeDefined();
  });

  it('@Get /youtube/invalid should fail', async () => {
    const response = await request(server).get(
      `/youtube/${youtubeConstants.id.notValid[1]}`,
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeDefined();
    expect(response.body.error.message).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
