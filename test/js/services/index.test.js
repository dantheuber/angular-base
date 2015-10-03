'use strict';

var path = require('path');
var glob = require('glob');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var proxyquire = require('proxyquire').noCallThru();
var sutPath = '../../../lib/js/services/';

describe('The services index', function() {
  var filenames, ngService, stubs;

  beforeEach(function() {
    filenames = glob
      .sync('*.js', {
        cwd: path.resolve(__dirname, sutPath),
        ignore: 'index.js'
      })
      .map(function(filename) {
        return path.basename(filename, '.js');
      });

    ngService = sinon.spy();
    stubs = {
      'angular': {
        'module': sinon.stub().returns({
          'service': ngService
        })
      }
    };

    filenames.forEach(function(filename) {
      stubs['./' + filename] = filename;
    });

    proxyquire(sutPath, stubs)();
  });

  it('imports every service into exampleApp', function() {
    filenames.forEach(function(filename) {
      var Filename = filename[0].toUpperCase() + filename.slice(1);
      expect(ngService).to.have.been.calledWith(Filename + 'Service', filename);
    });
  });
});
