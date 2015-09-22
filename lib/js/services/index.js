'use strict';

module.exports = function(app) {
  app.service('ConfigService', require('./config'));
};
