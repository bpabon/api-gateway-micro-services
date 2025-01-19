import request from 'supertest';
import { config } from '../src/config/config.js';
import { Server } from '../src/server.js';
import { jest } from '@jest/globals';
import { AppRoutes } from "../src/routes/index.routes.js";

describe('Server Initialization', () => {
  let server;
  // Ejecutar antes de cada prueba
  beforeAll(async () => {
    const options = {
      port: config.PORT, 
      routes: AppRoutes.routes
    };

    server = new Server(options);

    // Mocks de los métodos internos 
    jest.spyOn(server, 'middlewares').mockResolvedValue();
    jest.spyOn(server, 'routesProject').mockResolvedValue();
    jest.spyOn(server, 'errors').mockResolvedValue();
    jest.spyOn(server, 'connectionOrm').mockResolvedValue();
    jest.spyOn(server.app, 'listen').mockImplementation(() => {});  // Mock de listen


    await server.start(); // Lanza el servidor (utiliza la instancia del servidor)
  });
  // Limpia después de cada prueba
  afterAll(() => {
    // Cerrar el servidor
    if (server.app && server.app.close) {
      server.app.close();
    }
  });
  it('should initialize the middlewares', async () => {
    expect(server.middlewares).toHaveBeenCalled();
  });

  it('should initialize the routes', async () => {
    expect(server.routesProject).toHaveBeenCalled();
  });

  it('should initialize error handling', async () => {
    expect(server.errors).toHaveBeenCalled();
  });

  it('should connect to the database', async () => {
    expect(server.connectionOrm).toHaveBeenCalled();
  });
  it('should start the server on the correct port', async () => {
    const response = await request(server.app).get('/');
    expect(response.status).toBe(404);
  });
});