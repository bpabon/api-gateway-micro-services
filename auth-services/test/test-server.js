import express from 'express';
import { config } from '../src/config/config.js';
import { Server } from '../src/server.js';
import {AppRoutes} from '../src/routes/index.routes.js';

export const testServer = new Server({
  port: config.PORT,
  routes: AppRoutes.routes,
});