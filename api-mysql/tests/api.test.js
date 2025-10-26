const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {
    test('GET /health should return healthy status', async () => {
        const response = await request(app).get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('healthy');
    });

    test('GET /api/users should return list of users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /api/users/:id should return a single user', async () => {
        const response = await request(app).get('/api/users/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
    });

    test('POST /api/users should create a new user', async () => {
        const newUser = {
            name: 'Test User',
            email: `test${Date.now()}@example.com`
        };
        const response = await request(app)
            .post('/api/users')
            .send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newUser.name);
        expect(response.body.email).toBe(newUser.email);
    });
});
