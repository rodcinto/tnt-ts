import bodyParser from 'body-parser';
import {Express} from 'express';
import npmlog from 'npmlog';

class Server {
  readonly DEFAULT_PORT = 8080;
  app: Express;
  logger: npmlog.Logger;

  constructor(app: Express, logger: npmlog.Logger) {
    this.logger = logger;
    this.app = app;

    this.configureApp();
  }

  public start(): void {
    const port = process.env.PORT ?? this.DEFAULT_PORT;

    // Server listening
    this.app.listen(port, () => {
      this.logger.info(
        'server',
        `Trash and Treasure running on  http://localhost:${port}`
      );
    });
  }

  public getApp(): Express {
    return this.app;
  }

  private configureApp(): void {
    try {
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({extended: true}));
      this.app.use(bodyParser.text());
      this.app.use(bodyParser.json({type: 'application/json'}));
    } catch (err) {
      this.logger.error('error', 'Error configuring app:', err);
    }
  }
}

export default Server;
