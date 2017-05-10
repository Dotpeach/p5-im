
var dir = require('require-dir');
var _ = require('underscore');

module.exports = function (Handlebars) {
  'use strict';

  var ext = dir('../../../tools/handlebars/helpers');
  _.map(ext, function (helper) {
    if (helper.register) {
      helper.register(Handlebars);
    }
  });
};
