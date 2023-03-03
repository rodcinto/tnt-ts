import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import npmlog from 'npmlog';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

app.get('/', (req: Request, res: Response) => {
  res.json('This is Treash and Treasure');
});

app.listen(port, () => {
  npmlog.info(
    'server',
    `Trash and Treasure running on  http://localhost:${port}`
  );
});
