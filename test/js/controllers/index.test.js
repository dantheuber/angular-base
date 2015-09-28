'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var Sut = require('../../../lib/js/controllers/index');

describe('Controller Index',function() {
  var sut;
  var app = {};
  beforeEach(function() {
    app = {
      controller: sinon.spy()
    };
    var sut = Sut(app);
  });

  it('runs', function() {
    expect(app.controller).to.have.been.called;
  })
});
