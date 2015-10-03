'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var proxyquire = require('proxyquire').noCallThru();
var sutPath = '../../lib/js/routes';

describe('The routes config', function() {
  var stubs, ngConfig, $routeProvider, routes;

  beforeEach(function() {
      ngConfig = sinon.spy();
      stubs = {
        'angular': {
          'module': sinon.stub().returns({
            'config': ngConfig
          })
        }
      };
      $routeProvider = {
        when: function() {},
        otherwise: function() {}
      };
      sinon.stub($routeProvider, 'when').returns($routeProvider);
      sinon.stub($routeProvider, 'otherwise').returns($routeProvider);

      proxyquire(sutPath, stubs)();
      routes = ngConfig.getCall(0).args[0];
  });

  it('attaches to exampleApp', function() {
    expect(stubs.angular.module).to.have.been.calledWith('baseAngularApp');
  });

  it('injects its dependencies', function() {
    expect(routes.length).to.equal(routes.$inject.length);
  });

  it('declares the app\'s routes', function() {
    routes($routeProvider);

    expect($routeProvider.when).to.have.been.calledWith('/index');
    expect($routeProvider.otherwise).to.have.been.called;
  });
});
