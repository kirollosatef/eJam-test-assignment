import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('Superhero Integration Tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /superheroes', () => {
    it('should create a new superhero', () => {
      return request(app.getHttpServer())
        .post('/superheroes')
        .send({
          name: 'Test Hero',
          superpower: 'Test Power',
          humilityScore: 7,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual({
            id: expect.any(String),
            name: 'Test Hero',
            superpower: 'Test Power',
            humilityScore: 7,
          });
        });
    });

    it('should validate input data', () => {
      return request(app.getHttpServer())
        .post('/superheroes')
        .send({
          name: 'Test Hero',
          superpower: 'Test Power',
          humilityScore: 11, // not good score > 10
        })
        .expect(400);
    });
  });

  describe('GET /superheroes', () => {
    beforeEach(async () => {
      await request(app.getHttpServer()).post('/superheroes').send({
        name: 'Hero 1',
        superpower: 'Power 1',
        humilityScore: 5,
      });

      await request(app.getHttpServer()).post('/superheroes').send({
        name: 'Hero 2',
        superpower: 'Power 2',
        humilityScore: 8,
      });
    });

    it('should return paginated superheroes', () => {
      return request(app.getHttpServer())
        .get('/superheroes?page=1&limit=1')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(1);
          expect(res.body.meta).toEqual({
            total: 2,
            page: 1,
            lastPage: 2,
            limit: 1,
          });
        });
    });

    it('should validate pagination parameters', () => {
      return request(app.getHttpServer())
        .get('/superheroes?page=0&limit=0')
        .expect(400);
    });
  });
});
