import {Express, Request, Response} from 'express';
import NewPersonSignsUp from '../Person/Command/NewPersonSignsUp';
import FindOnePerson from '../Person/Query/FindOnePerson';
import npmlog from 'npmlog';

class Router {
  static readonly ROOT = '/';
  static readonly PERSON = '/person';
  static readonly PERSON_USERNAME = '/person/:username';

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
        command.executeCommand();
        res.sendStatus(201);
      } catch (err) {
        res.status(500).send({
          message: 'An internal error occurred'
        });
      }
    });
    app.route(this.PERSON_USERNAME).get((req: Request, res: Response) => {
      const findOnePerson = new FindOnePerson(req.params.username);
      findOnePerson.executeQuery().then((result) => {
        res.json({
          person: result
        });
      }).catch((err: any) => {
        res.status(404).send({
          message: `Person with username ${req.params.username} not found`,
        });
      });
    });
  }
}

export default Router;
