import express, {Express, Request, Response} from 'express';
import npmlog from 'npmlog';
import bodyParser from 'body-parser';
import mongoose, {Connection, Schema} from 'mongoose';
import config from 'config';

// Connect to MongoDB
mongoose.connect(config.get('DBHost'), {
  dbName: config.get('DBName'),
  user: config.get('DBUser'),
  pass: config.get('DBPass'),
});

const db: Connection = mongoose.connection;
db.on('error', npmlog.error.bind(console, 'CONNECTION ERROR:'));

const app: Express = express();
const port = process.env.PORT ?? 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

interface PersonInterface {
  name: string;
  login: string;
  email: string;
}

const personSchema = new Schema<PersonInterface>({
  name: {type: String, required: true},
  login: {type: String, required: true},
  email: {type: String, required: true},
});
const PersonModel = mongoose.model<PersonInterface>('Person', personSchema);

// API Root
app.get('/', (req: Request, res: Response) => {
  res.json('This is Treash and Treasure');
});

// Create a new person
app.post('/person', async (req: Request, res: Response) => {
  try {
    const person = await PersonModel.create({
      name: req.body.name,
      login: req.body.login,
      email: req.body.email,
    });

    const savedPerson = await person.save();

    npmlog.info('server', 'Person created:', savedPerson);

    res.sendStatus(201);
  } catch (err) {
    npmlog.error('error', 'Error creating person:', err);
    res.status(500).send('Error creating person');
  }
});

// Server listening
app.listen(port, () => {
  npmlog.info(
    'server',
    `Trash and Treasure running on  http://localhost:${port}`
  );
});
