// {{ root }}
// --------------------------------------------------------------------------
// Provide the relative URL path to the directory of the current file
// NOTE: The context must provide the URL of the file.
'use strict';

var path = require('path');

module.exports = function () {
  if (!this.url) {
    return '.';
  }

  return path.relative(path.parse(this.url).dir, '/');
};
