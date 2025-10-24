import fastify  from "fastify";
import { register } from "./controllers/register-controller.ts";

export async function appRoutes(app: fastify.FastifyInstance) {
  app.post('/users', register)
}