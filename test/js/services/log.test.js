'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var proxyquire = require('proxyquire').noCallThru();
var SutPath = '../../../lib/js/services/log';

describe('LogService', function() {

  var sut, Sut, stubs;
  var $http = {};
  var $log = {};
  var message = {
    msg: 'Test Error message',
    other: {
      item: 'custom value'
    }
  };

  beforeEach(function() {
    $http = sinon.stub().returns({
      error: sinon.spy()
    });
    $log.error = sinon.spy();
    stubs = {
      'angular': {
        'merge': sinon.spy()
      },
      'packageJson': {
        'name': 'crm-case-management-ui',
        'version': '0.0.0'
      }
    };

    Sut = proxyquire(SutPath, stubs);
    sut = new Sut($http, $log);
  });

  it('injects its dependencies', function() {
    expect(Sut.length).to.equal(Sut.$inject.length);
  });

  it('Calls log service for info level message', function() {
    sut.info(message);
    expect($http).to.have.been.calledOnce;
    expect($http.firstCall.args[0].data.level).to.equal('info');
  });

  it('Calls log service for warn level message', function() {
    sut.warn(message);
    expect($http).to.have.been.calledOnce;
    expect($http.firstCall.args[0].data.level).to.equal('warn');
  });

  it('Calls log service for error level message', function() {
    sut.error(message);
    expect($http).to.have.been.calledOnce;
    expect($http.firstCall.args[0].data.level).to.equal('error');
  });

  it('Calls log service for fatal level message', function() {
    sut.fatal(message);
    expect($http).to.have.been.calledOnce;
    expect($http.firstCall.args[0].data.level).to.equal('fatal');
  });

  it('Calls log service for debug level message', function() {
    sut.debug(message);
    expect($http).to.have.been.calledOnce;
    expect($http.firstCall.args[0].data.level).to.equal('debug');
  });

  it('Calls log service for trace level message', function() {
    sut.trace(message);
    expect($http).to.have.been.calledOnce;
    expect($http.firstCall.args[0].data.level).to.equal('trace');
  });

  it('Calls logs error to console if http request fails', function() {
    sut.info(message);
    $http().error.getCall(0).callArgWith(0, {error:'error'});
    expect($log.error).to.have.been.calledWith('Error communicating with logging api ',{error:'error'});
    expect($log.error).to.have.been.calledTwice;
  });
});
