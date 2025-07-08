import request from 'supertest';
import server from '../index';

afterAll(() => {
  server.close();
});

describe('Operaciones CRUD de cafes', () => {
  describe('GET /cafes', () => {
    it('should return a 200 status and an array with at least one object', async () => {
      const response = await request(server).get('/cafes');

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
      expect(response.body[0]).toBeInstanceOf(Object);
    });
  });

  describe('DELETE /cafes/:id', () => {
    it('should return a 404 status if the cafe id does not exist', async () => {
      const nonExistentId = 5;
      const requestParamsId = nonExistentId;
      const response = await request(server)
        .delete(`/cafes/${requestParamsId}`)
        .set('Authorization', 'Bearer valid_token');

      expect(response.statusCode).toBe(404);
    });
  });

  describe('POST /cafes', () => {
    it('should return a 201 status when a new cafe is added', async () => {
      const payload = { id: 5, nombre: 'Flat White' };
      const response = await request(server).post('/cafes').send(payload);

      expect(response.statusCode).toBe(201);
    });
  });

  describe('PUT /cafes/:id', () => {
    it('should return a 400 status code if the ID in the params is different from the ID in the payload', async () => {
      const requestParamsId = 1;
      const payload = { id: 6, nombre: 'Espresso' };
      const response = await request(server)
        .put(`/cafes/${requestParamsId}`)
        .send(payload);

      expect(response.statusCode).toBe(400);
    });
  });
});
