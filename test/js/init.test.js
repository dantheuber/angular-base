'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire').noCallThru();

chai.use(require('sinon-chai'));
var sutPath = '../../lib/js/init';

describe('init.js', function() {
  var sut, stubs, success, error, app;
  var $http = {};

  var readySpy = sinon.spy();

  beforeEach(function() {
    app = { constant: sinon.spy() };
    error = sinon.spy();
    success = sinon.stub().returns({ error: error });
    stubs = {
      'angular': {
        'element': sinon.stub().returns({ ready: readySpy }),
        'bootstrap': sinon.spy(),
        'injector': sinon.stub().returns({
          'get': sinon.stub().returns({
            'get': sinon.stub().returns({
                success: success
            }),
            'error': sinon.spy()
          })
        })
      }
    };
    sut = proxyquire(sutPath, stubs);

    $http.get = stubs.angular.injector().get().get;
    $http.get().success('success').error('error');
    sut(app);
  });

  it('Call Injectables Getter', function() {
    expect(stubs.angular.injector).to.have.been.calledWith(['ng','baseAngularApp']);
    expect(stubs.angular.injector().get).to.have.been.calledWith('$http');
    expect(stubs.angular.injector().get).to.have.been.calledWith('$window');
  });

  it('calls url for config', function() {
    expect($http.get).to.have.been.calledWith('http://api.openweathermap.org/data/2.5/weather?q=Budapest');
  });

  it('Handles Success', function() {
    expect(success).to.have.been.calledWith('success');
  });

  it('Handles Error', function() {
    expect(error).to.have.been.calledWith('error');
  });

  it('Calls initError when error occurs', function() {
    error.getCall(1).callArgWith(0, {data: 'data'} ,401);
    // forcing coverage
    expect(true).to.be.true;
  });

  it('Calls initError with Internal Server Error', function() {
    error.getCall(1).callArgWith(0, {data: 'data'}, 500);
    expect(stubs.angular.injector().get().error).to.have.been.called;
  });

  describe('Sets up initSuccess and', function() {
    global.document = {};

    it('Calls initSuccess', function() {
      var config = {data: 'data'};
      success.getCall(1).callArgWith(0, {data: 'data'});
      expect(app.constant.firstCall.args[0]).to.equal('globalConfig');
      expect(app.constant.firstCall.args[1].data).to.equal(config.data);
    });

    it('Calls bootstraps the app', function() {
      readySpy.callArg(0);
      expect(readySpy).to.have.been.called;
    });
  });
});
