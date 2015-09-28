'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var Sut = require('../../../lib/js/controllers/main');

describe('MainController', function() {
  var sut;
  var scope = {};
  var ConfigService = {};

  beforeEach(function() {
    ConfigService = {
      get: sinon.stub().returns({
        then: sinon.stub().returns({
          catch: sinon.spy()
        })
      })
    };
    sut = new Sut(scope,ConfigService);
  });

  it('injects its dependencies', function() {
    expect(Sut.length).to.equal(Sut.$inject.length);
  });
});
