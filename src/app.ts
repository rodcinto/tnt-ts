import express, {Express, Request, Response} from 'express';
import npmlog from 'npmlog';
import mongoose, {Connection, Schema} from 'mongoose';
import config from 'config';

import Server from './API/Server';
import Router from './API/Router';

// Connect to MongoDB
mongoose.connect(config.get('DBHost'), {
  dbName: config.get('DBName'),
  user: config.get('DBUser'),
  pass: config.get('DBPass'),
});

const db: Connection = mongoose.connection;
db.on('error', npmlog.error.bind(console, 'CONNECTION ERROR:'));

const app: Express = express();
const server = new Server(app, npmlog);

Router.assignRoutes(app);

server.start();
