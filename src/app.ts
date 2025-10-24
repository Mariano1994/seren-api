import fastify from 'fastify';
import { register } from './http/controllers/register-controller.ts';
import { appRoutes } from './http/routes.ts';

export const app = fastify();

app.register(appRoutes)

