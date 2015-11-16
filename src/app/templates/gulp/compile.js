'use strict';

var gulp = require('gulp');
var del = require('del');
var config = require('../config');
var help = require('./help');

gulp.task('compile', ['clean:compile'], function() {
  ['markups', 'scripts', 'styles', 'images', 'other'].forEach(function(task) {
    gulp.run(task);
  });
});

gulp.task('clean:compile', function() {
  return del(config.tmp);
});
