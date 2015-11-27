'use strict';

var gulp = require('gulp');
var del = require('del');
var config = require('../config');

gulp.task('clean:tmp', function() {
  return del(config.paths.tmp);
});

gulp.task('clean:build', function() {
  return del(config.paths.dist);
});
