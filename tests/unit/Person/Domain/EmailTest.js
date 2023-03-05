const {describe, it, beforeEach} = require('mocha');
const chai = require('chai');
const faker = require('faker');

let Email;

beforeEach(() => {
  Email = require('../../../../build/src/Person/Domain/Email');
});

describe('Person Email', () => {
  it('should should sanitize', () => {
    const emailReference = faker.internet.email();

    const email = new Email.default(emailReference.toUpperCase());
    chai.assert.equal(email.getValue(), emailReference.toLowerCase());
  });

  it('should should throw error when email is invalid', () => {
    chai.assert.throws(() => {
      new Email.default('Bad Email@domain.com');
    }, Error);
    chai.assert.throws(() => {
      new Email.default('BadEmailwithoutdomain.com');
    }, Error);
    chai.assert.throws(() => {
      new Email.default('BadEmail@BadDomain');
    }, Error);
  });
});
