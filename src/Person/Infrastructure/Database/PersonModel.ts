import { Schema } from "mongoose";
import Mongoose from "./Mongoose";
import PersonPropertiesInterface from "./PersonPropertiesInterface";
import npmlog from "npmlog";

class PersonModel {
  readonly TABLE_NAME: string = 'Person';

  private mongoose: Mongoose;
  private logger: npmlog.Logger;

  constructor(mongoose: Mongoose, logger: npmlog.Logger) {
    this.mongoose = mongoose;
    this.logger = logger;
  }

  public saveNew(
    name: string,
    username: string,
    email: string
  ): void {
    const personSchema = new Schema<PersonPropertiesInterface>({
      name: {type: String, required: true},
      username: {type: String, required: true},
      email: {type: String, required: true},
    });
    const PersonModel = this.mongoose
      .getConnector()
      .model<PersonPropertiesInterface>(
        this.TABLE_NAME,
        personSchema
      );

      PersonModel.create({
        name: name,
        username: username,
        email: email,
      }).then((person) => {
        return person.save();
      }).then((savedPerson) => {
        this.logger.info('server', 'Person created:', savedPerson);
      }).catch((err) => {
        this.logger.error('error', 'Error creating person:', err);
      });
  }
}

export default PersonModel;
