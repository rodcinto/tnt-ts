import Email from "../Domain/Email";
import Person from "../Domain/Person";
import PersonInterface from "../Domain/PersonInterface";
import CommandInterface from "./CommandInterface";


class NewPersonSignsUp implements CommandInterface {
  private readonly person: PersonInterface;

  constructor(
    name: string,
    username: string,
    rawEmail: string
  ) {
    const email = new Email(rawEmail);
    this.person = new Person(name, username, email);
  }

  public executeCommand(): void {
    this.person.create();
  }
}

export default NewPersonSignsUp;
