
var dir = require('require-dir');
var _ = require('underscore');

module.exports = function (Twig) {
  'use strict';

  Twig.extend(function (Twig) {
    var ext = dir('../../../tools/twig/extends');
    _.map(ext, function (fn) {
      return fn(Twig);
    });
  });
};
