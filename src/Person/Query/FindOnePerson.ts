import PersonPropertiesInterface from "../Infrastructure/Database/PersonPropertiesInterface";
import StaticModelFactory from "../Infrastructure/Database/StaticModelFactory";
import QueryInterface from "./QueryInterface";
import UsernameSanitizer from "../Domain/UsernameSanitizer";

class FindOnePerson implements QueryInterface {
  constructor(private username: string) {
    this.username = UsernameSanitizer.sanitize(username);
  }

  public async executeQuery(): Promise<PersonPropertiesInterface> {
    const personModel = StaticModelFactory.createPersonModel();
    const person = await personModel.findByUsername(this.username);
    if (!person) {
      throw new Error(`Person with username ${this.username} not found`);
    }

    return person;
  }
}

export default FindOnePerson;
