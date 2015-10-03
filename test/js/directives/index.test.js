'use strict';

var path = require('path');
var glob = require('glob');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var proxyquire = require('proxyquire').noCallThru();
var sutPath = '../../../lib/js/directives/';

describe('The directives index', function() {
  var filenames, ngDirective, stubs;

  beforeEach(function() {
    filenames = glob
      .sync('*.js', {
        cwd: path.resolve(__dirname, sutPath),
        ignore: 'index.js'
      })
      .map(function(filename) {
        return path.basename(filename, '.js');
      });

    ngDirective = sinon.spy();
    stubs = {
      'angular': {
        'module': sinon.stub().returns({
          'directive': ngDirective
        })
      }
    };

    filenames.forEach(function(filename) {
      stubs['./' + filename] = filename;
    });

    proxyquire(sutPath, stubs)();
  });

  it('imports every directive into the app', function() {
    filenames.forEach(function(filename) {
      var normalizedFileName = filename[0].toUpperCase() + filename.slice(1);
      expect(ngDirective).to.have.been.calledWith('cm' + normalizedFileName, filename);
    });
  });
});
