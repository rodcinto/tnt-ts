import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import npmlog from 'npmlog';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 8080;

app.get('/', (req: Request, res: Response) => {
  res.send('This is Treash and Treasure');
});

app.listen(port, () => {
  npmlog.info(
    'server',
    `Trash and Treasure running on  http://localhost:${port}`
  );
});
