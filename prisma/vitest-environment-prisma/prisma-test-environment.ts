import 'dotenv/config';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import type { Environment } from 'vitest/environments';
import { prisma } from '../../src/lib/prisma.ts';

const generateDatabaseURL = (schema: string) => {
	if (!process.env.DATABASE_URL) {
		throw new Error('Please provide a DATABASE_URL env variable');
	}
	const url = new URL(process.env.DATABASE_URL);

	url.searchParams.set('schema', schema);

	return url.toString();
};
export default (<Environment>{
	name: 'prisma',
	viteEnvironment: 'ssr',
	async setup() {
		//create test database
		const schema = randomUUID();

		const databaseUrl = generateDatabaseURL(schema);

		process.env.DATABASE_URL = databaseUrl;

		console.log({ databaseUrl });

		execSync('npx prisma migrate deploy');

		return {
			async teardown() {
				// delete test database
				await prisma.$executeRawUnsafe(
					`DROP SCHEMA IF EXISTS "${schema} CASCADE"`,
				);

				await prisma.$disconnect();
			},
		};
	},
});
