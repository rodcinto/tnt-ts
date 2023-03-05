const {describe, it, beforeEach} = require('mocha');
const chai = require('chai');
const faker = require('faker');
const { default: Email } = require('../../../../build/src/Person/Domain/Email');

let Person;
let email;

beforeEach(() => {
  Person = require('../../../../build/src/Person/Domain/Person');
  email = new Email(faker.internet.email());
});

describe('Person', () => {
  it('should should instantiate', () => {
    const person = new Person.default(faker.name.firstName(), 'johndoe', email);

    chai.expect(person).instanceOf(Person.default);
  });

  it('should normalize name and username', () => {
    const person = new Person.default('john doe ', 'JOHN_DOE', email);

    chai.expect(person.getName()).to.equal('John Doe');
    chai.expect(person.getUsername()).to.equal('john_doe');
  });

  it('should throw an error if name is too short or too long', () => {
    chai.assert.throws(() => {
      new Person.default(
        'do',
        'johndoe',
        email
      );
    }, Error);
    chai.assert.throws(() => {
      new Person.default(
        'Zephyra the Enchantress of the Mystic Woods, Guardian of the Ancient Runes and Keeper of the Celestial Gateways.',
        'johndoe',
        email
      );
    }, Error);
  });

  it('should throw an error if username is invalid', () => {
    chai.assert.throws(() => {
      new Person.default(
        'john doe',
        'John Doe',
        email
      );
    }, Error);
    chai.assert.throws(() => {
      new Person.default(
        'john doe',
        'john-doe',
        email
      );
    }, Error);
  });
});
