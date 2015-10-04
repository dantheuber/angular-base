'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var Sut = require('../../../lib/js/services/config');

describe('ConfigService', function() {
  var sut, $http, $q;

  beforeEach(function() {
    $q = {
      defer: sinon.stub().returns({
        resolve: sinon.spy(),
        reject: sinon.spy(),
        promise: sinon.spy()
      })
    };

    $http = {
      get: sinon.stub().returns({
        success: sinon.stub().returns({
          error: sinon.spy()
        })
      })
    };

    sut = new Sut($http, $q);
  });

  it('calls api for config', function() {
    expect($http.get).to.have.been.calledWith('http://api.openweathermap.org/data/2.5/weather?q=Budapest');
  });

  it('returns promise on success', function() {
    $http.get().success.getCall(0).callArgWith(0,{some: 'data'});
    expect($q.defer().resolve).to.have.been.calledWith({some: 'data'});
  });

  it('returns promise on error', function() {
    $http.get().success().error.getCall(0).callArgWith(0,{});
    expect($q.defer().reject).to.have.been.called; //jshint ignore:line
  });

  describe('this.get()', function() {
    it('returns a promise', function() {
      var test = sut.get();
      expect(test).to.deep.equal($q.defer().promise);
    });
  });
});
