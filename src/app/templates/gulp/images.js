'use strict';

var path = require('path');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var sequence = require('run-sequence');
var config = require('../config');
var help = require('./help');

gulp.task('images', function() {
  return gulp.src(help.filter(config.paths.src, '.{gif,jpeg,jpg,png,svg}'))
    .pipe(imagemin())
    .pipe(gulp.dest(config.paths.tmp));
});

gulp.task('watch:images', function() {
  gulp.watch(path.join(config.paths.src, '**/*.{gif,jpeg,jpg,png,svg}'), function(cb) {
    sequence('images', 'reload', cb);
  });
});
