import {Express, Request, Response} from 'express';

class Router {
  static readonly ROOT = '/';

  static assignRoutes(app: Express) {
    // API Root
    app.route(Router.ROOT).get((req: Request, res: Response) => {
      res.json({message: 'This is Treash and Treasure'});
    });
  }
}

export default Router;
