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

    it('sets $scope variables on success', function() {
      var testData = {
        name: 'some name',
        weather: [{ description: 'some description' }]
      };
      ConfigService.get().then.callArgWith(0,testData);
      expect(scope.location).to.equal(testData.name);
      expect(scope.message).to.equal(testData.weather[0].description);
    });

    it('sets $scope.message on error', function() {
      ConfigService.get().then().catch.callArgWith(0,'error');
      expect(scope.location).to.equal('ERROR');
      expect(scope.message).to.equal('error');
    });
  });


});
