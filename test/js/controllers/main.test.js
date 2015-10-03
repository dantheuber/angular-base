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

  describe('ConfigService.get()', function() {
    it('is called immediately', function() {
      expect(ConfigService.get).to.have.been.called;
    });

    it('sets $scope.message on success', function() {
      var testMessage = 'Some Message';
      ConfigService.get().then.callArgWith(0,{message: testMessage});
      expect(scope.message).to.equal(testMessage);
    });

    it('sets $scope.message on error', function() {
      ConfigService.get().then().catch.callArg(0);
      expect(scope.message).to.equal('Failed to get cat facts!!');
    });
  });


});
