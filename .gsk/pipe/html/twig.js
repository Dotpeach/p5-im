// Définition du LazyPipe pour utiliser Twig
'use strict';

var path     = require('path');
var _        = require('underscore');
var lazypipe = require('lazypipe');
var gutil    = require('gulp-util');
var twig     = require('gulp-twig');
var data     = require('gulp-data');
var dir      = require('require-dir');
var err      = require('../../tools/errcb');
var ENV      = require('../../tools/env').html;

var genericDataFile  = path.resolve(path.join(ENV['data-dir'], 'data.json'));

// UTILS
// ----------------------------------------------------------------------------
function processData(file) {
  var base = file.path.replace(ENV['src-dir'], ENV['data-dir']);
  var specificDataFile = base.replace('.twig', '.json');
  var gData = {};
  var sData = {};

  try {
    gData = require(genericDataFile);
  } catch (e) {
    gutil.log(gutil.colors.yellow('WARN:'),
      'Unable to find data from',
      genericDataFile.replace(path.resolve('.'), '').slice(1)
    );
  }

  try {
    sData = require(specificDataFile);
  } catch (e) {
    gutil.log(gutil.colors.yellow('WARN:'),
      'Unable to find data from',
      specificDataFile.replace(path.resolve('.'), '').slice(1)
    );
  }

  return _.extend({}, gData, sData);
}

function load(path) {
  try {
    var fns  = dir(path);
    var list = _.map(fns, function (obj) {
      return obj;
    });

    if (_.isFunction(list[0])) {
      return function (Twig) {
        _.each(list, function (fn) {
          fn(Twig);
        });
      };
    }

    return list;
  } catch (e) {
    // gutil.log(gutil.colors.yellow('WARN:'), e.message);
  }
}


// TWIG CONFIGURATION
// ----------------------------------------------------------------------------
var CONF = {
  errorLogToConsole: true,
  onError          : err
};

_.each({
  extend   : load('../../tools/twig/extends')
}, function (val, key) {
  if (val) { CONF[key] = val; }
});

module.exports = function () {
  var lazystream = lazypipe()
    .pipe(data, processData)
    .pipe(twig, CONF);

  return lazystream();
};
