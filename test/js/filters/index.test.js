'use strict';

var path = require('path');
var glob = require('glob');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var proxyquire = require('proxyquire').noCallThru();
var sutPath = '../../../lib/js/filters/';

describe('The services index', function() {
  var filenames, ngFilter, stubs;

  beforeEach(function() {
    filenames = glob
      .sync('*.js', {
        cwd: path.resolve(__dirname, sutPath),
        ignore: 'index.js'
      })
      .map(function(filename) {
        return path.basename(filename, '.js');
      });

    ngFilter = sinon.spy();
    stubs = {
      'angular': {
        'module': sinon.stub().returns({
          'filter': ngFilter
        })
      }
    };

    filenames.forEach(function(filename) {
      stubs['./' + filename] = filename;
    });

    proxyquire(sutPath, stubs)();
  });

  it('imports every filter into app', function() {
    filenames.forEach(function(filename) {
      expect(ngFilter).to.have.been.calledWith(filename + 'Filter', filename);
    });
  });
});
