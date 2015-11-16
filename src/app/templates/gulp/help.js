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

help.src = function src(ext) {
  return [
    path.join(config.paths.src, '**/*' + ext),
    '!' + path.join(config.paths.src, '**/_*{/**,}'),
  ];
};
