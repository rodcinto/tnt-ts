import { Model, Schema } from "mongoose";
import Mongoose from "./Mongoose";
import PersonPropertiesInterface from "./PersonPropertiesInterface";
import npmlog from "npmlog";

class PersonModel {
  readonly TABLE_NAME: string = 'Person';

  private mongoose: Mongoose;
  private logger: npmlog.Logger;

  private personModel: Model<PersonPropertiesInterface> | undefined;

  constructor(mongoose: Mongoose, logger: npmlog.Logger) {
    this.mongoose = mongoose;
    this.logger = logger;
  }

  private getPersonModel(): Model<PersonPropertiesInterface> {
    if (this.personModel === undefined) {
      if (this.mongoose.getConnector().models.Person !== undefined) {
        this.personModel = this.mongoose.getConnector().models.Person;
        return this.personModel;
      }

      const personSchema = new Schema<PersonPropertiesInterface>({
        name: {type: String, required: true},
        username: {type: String, required: true},
        email: {type: String, required: true},
      });
      this.personModel = this.mongoose
        .getConnector()
        .model<PersonPropertiesInterface>(
          this.TABLE_NAME,
          personSchema
        );
    }
    return this.personModel;
  }

  public saveNew(
    name: string,
    username: string,
    email: string
  ): void {
    try {
      this.getPersonModel().create({
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
    } catch (err: any) {
      this.logger.error('error', 'ERROR CREATING PERSON:', err);
      throw err;
    }
  }

  public async findByUsername(username: string): Promise<PersonPropertiesInterface | null> {
    try {
      return await this.getPersonModel().findOne({ username: username });
    } catch (err) {
      this.logger.error('error', 'Error finding person:', err);
      throw err;
    }
  }
}

export default PersonModel;
