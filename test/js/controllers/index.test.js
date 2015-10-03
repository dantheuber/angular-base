'use strict';

var path = require('path');
var glob = require('glob');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var proxyquire = require('proxyquire').noCallThru();
var sutPath = '../../../lib/js/controllers/';

describe('The controllers index', function() {
  var filenames, ngController, stubs;

  beforeEach(function() {
    filenames = glob
      .sync('*.js', {
        cwd: path.resolve(__dirname, sutPath),
        ignore: 'index.js'
      })
      .map(function(filename) {
        return path.basename(filename, '.js');
      });

    ngController = sinon.spy();
    stubs = {
      'angular': {
        'module': sinon.stub().returns({
          'controller': ngController
        })
      }
    };

    filenames.forEach(function(filename) {
      stubs['./' + filename] = filename;
    });

    proxyquire(sutPath, stubs)();
  });

  it('imports every controller into the app', function() {
    filenames.forEach(function(filename) {
      var normalizedFileName = filename[0].toUpperCase() + filename.slice(1);
      expect(ngController).to.have.been.calledWith(normalizedFileName + 'Controller', filename);
    });
  });
});
