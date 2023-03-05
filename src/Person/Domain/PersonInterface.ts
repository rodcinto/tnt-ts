import Email from "./Email";

interface PersonInterface {
  name: string;
  username: string;
  email: Email;

  create(): void;
}

export default PersonInterface;
