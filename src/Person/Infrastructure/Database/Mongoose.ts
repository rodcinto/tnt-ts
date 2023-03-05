import config from "config";
import mongoose, { Connection } from "mongoose";
import npmlog from "npmlog";

class Mongoose {
  readonly DB_HOST: string = config.get("DBHost");
  readonly DB_NAME: string = config.get("DBName");
  readonly DB_USER: string = config.get("DBUser");
  readonly DB_PASS: string = config.get("DBPass");

  constructor(logger: npmlog.Logger) {
    mongoose.connect(this.DB_HOST, {
      dbName: this.DB_NAME,
      user: this.DB_USER,
      pass: this.DB_PASS,
    });

    const db: Connection = mongoose.connection;
    db.on('error', logger.error.bind(console, 'CONNECTION ERROR:'));
  }

  public getConnector(): typeof mongoose {
    return mongoose;
  }
}

export default Mongoose;
