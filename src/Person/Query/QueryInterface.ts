import PersonPropertiesInterface from "../Infrastructure/Database/PersonPropertiesInterface";

interface QueryInterface {
  executeQuery(): Promise<PersonPropertiesInterface>;
}

export default QueryInterface;
