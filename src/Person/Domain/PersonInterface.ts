import Email from "./Email";

interface PersonInterface {
  id: string | undefined;
  name: string;
  username: string;
  email: Email;

  create(): void;
}

export default PersonInterface;
