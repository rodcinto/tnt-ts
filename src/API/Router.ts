import {Express, Request, Response} from 'express';
import NewPersonSignsUp from '../Person/Command/NewPersonSignsUp';

class Router {
  static readonly ROOT = '/';
  static readonly PERSON = '/person';

  static assignRoutes(app: Express) {
    // API Root
    app.route(Router.ROOT).get((req: Request, res: Response) => {
      res.json({message: 'This is Treash and Treasure'});
    });

    // Create a new person
    app.route(Router.PERSON).post(async (req: Request, res: Response) => {
      let command;
      try {
        command = new NewPersonSignsUp(
          req.body.name,
          req.body.username,
          req.body.email
        );
      } catch (err: any) {
        res.status(400).send({
          message: `Invalid person data: ${err.message}`,
        });
        return;
      }

      try {
        command.execute();
        res.sendStatus(201);
      } catch (err) {
        res.status(500).send({
          message: 'An internal error occurred'
        });
      }
  });
  }
}

export default Router;
