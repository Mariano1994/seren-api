import { env } from '../env/index.ts';
import { app } from './app.ts';

app
	.listen({
		host: '0.0.0.0',
		port: env.PORT,
	})
	.then(() => {
		console.log('Server is Running');
	});
