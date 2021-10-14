import supertest from 'supertest';
import app from '../../index';
import Stats from '../../database/repositories/stats-repository';

test("GET /api/v1/stats/global", async () => {
    Stats.getById(new Date().toISOString().substr(0, 10));
  
    await supertest(app).get("/api/v1/stats/global")
      .query({date: new Date().toISOString().substr(0, 10)})
      .expect(401);
      // Not authorized
  });
  