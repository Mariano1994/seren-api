import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '../../app.ts';

describe('Authenticate (e2e)', async () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to authenticate', async () => {
		await request(app.server).post('/users').send({
			name: 'John Doe',
			email: 'john@gmail.com',
			password: '123456',
		});

		const response = await request(app.server).post('/session').send({
			email: 'john@gmail.com',
			password: '123456',
		});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({ token: expect.any(String) });
	});
});
