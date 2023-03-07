import express, {Express, Request, Response} from 'express';
import npmlog from 'npmlog';

import Server from './API/Server';
import Router from './API/Router';

const app: Express = express();
const server = new Server(app, npmlog);

Router.assignRoutes(app);

server.start();
