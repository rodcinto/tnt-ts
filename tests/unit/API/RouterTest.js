const {describe, it, beforeEach} = require('mocha');
const sinon = require('sinon');
const express = require('express');

let Router;

beforeEach(() => {
  Router = require('../../../build/src/API/Router.js');
});

describe('Server', () => {
  it('should assign routes', () => {
    const app = express();
    const routeSpy = sinon.spy(app, 'route');

    Router.default.assignRoutes(app);

    sinon.assert.calledWithExactly(routeSpy, Router.default.ROOT);
  });
});
