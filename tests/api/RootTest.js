const chai = require('chai');
const {use, expect} = chai;
const chaiHttp = require('chai-http');
const {describe, it} = require('mocha');

use(chaiHttp);

const {request} = chai;

describe('RootAPI', () => {
  it('should see the API root', async () => {
    const response = await request('http://localhost:8080').get('/');
    const jsonBody = JSON.parse(response.text);

    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(typeof jsonBody.message).to.equal('string');
  });
});
