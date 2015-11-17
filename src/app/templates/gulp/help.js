'use strict';

var path = require('path');
var gutil = require('gulp-util');
var config = require('../config');
var help = module.exports = {};

help.plumb = function plumb(error) {
  gutil.beep();
  gutil.log(error);
  this.emit('end'); // need this
};

help.filter = function filter(dir, ext) {
  return [
    path.join(dir, '**/*' + ext),
    '!' + path.join(dir, '**/_*{/**,}'),
  ];
};

help.requireUncached = function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
};
