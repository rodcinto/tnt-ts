import PersonModel from "../Infrastructure/Database/PersonModel";
import StaticModelFactory from "../Infrastructure/Database/StaticModelFactory";
import Email from "./Email";
import PersonInterface from "./PersonInterface";
import UsernameSanitizer from "./UsernameSanitizer";

class Person implements PersonInterface {
  readonly MIN_NAME_LENGTH: number = 3;
  readonly MAX_NAME_LENGTH: number = 75;
  readonly MIN_USERNAME_LENGTH: number = 3;
  readonly MAX_USERNAME_LENGTH: number = 25;
  readonly USERNAME_REGEX: RegExp = /^[a-zA-Z0-9_]+$/;

  id: string | undefined;
  name: string;
  username: string;
  email: Email;

  constructor(name: string, username: string, email: Email) {
    this.verifyNameConstraints(name);
    this.name = this.sanitizeName(name);

    this.verifyUsernameConstraints(username);
    this.username = this.sanitizeUsername(username);

    this.email = email;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getUsername(): string {
    return this.username;
  }

  public create(): void {
    const personModel: PersonModel = StaticModelFactory.createPersonModel()
    personModel.saveNew(
      this.name,
      this.username,
      this.email.getValue()
    ).then((createdId: string) => {
      this.id = createdId ?? undefined;
    }).catch((err: Error) => {
      throw err;
    });
  }

  private verifyNameConstraints(name: string): void {
    if (name.length < this.MIN_NAME_LENGTH) {
      throw new Error(`Name must be at least ${this.MIN_NAME_LENGTH} characters long`);
    }
    if (name.length > this.MAX_NAME_LENGTH) {
      throw new Error(`Name must be at most ${this.MAX_NAME_LENGTH} characters long`);
    }
  }

  private verifyUsernameConstraints(username: string): void {
    if (username.length < this.MIN_USERNAME_LENGTH) {
      throw new Error(`username must be at least ${this.MIN_USERNAME_LENGTH} characters long`);
    }
    if (username.length > this.MAX_USERNAME_LENGTH) {
      throw new Error(`username must be at most ${this.MAX_USERNAME_LENGTH} characters long`);
    }
    if (!this.USERNAME_REGEX.test(username)) {
      throw new Error(`username must only contain alphanumeric characters and underscores`);
    }
  }

  private capitalizeWords(str: string): string {
    return str.split(' ').map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  private sanitizeName(name: string): string {
    return this.capitalizeWords(name.trim());
  }

  private sanitizeUsername(username: string): string {
    return UsernameSanitizer.sanitize(username);
  }
}

export default Person;
