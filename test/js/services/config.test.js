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
        reject: sinon.spy()
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
    expect($http.get).to.have.been.calledWith('someapiurl');
  });

  it('returns promise on success', function() {
    $http.get().success.getCall(0).callArgWith(0,{some: 'data'});
    expect($q.defer().resolve).to.have.been.calledWith({some: 'data'});
  });

  it('returns promise on error', function() {
    $http.get().success().error.getCall(0).callArgWith(0,{});
    expect($q.defer().reject).to.have.been.called;
  });

});
