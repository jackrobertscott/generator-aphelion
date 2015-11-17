'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var config = require('../config');
var help = require('./help');

gulp.task('serve', [
  'compile',
  'watch',
], function(cb) {
  browserSync.init({
    server: config.paths.tmp,
  }, cb);
});

gulp.task('serve:production', [
  'build',
], function(cb) {
  browserSync.init({
    server: config.paths.dist,
  }, cb);
});

gulp.task('reload', browserSync.reload);

gulp.task('watch', [
  'watch:markups',
  'watch:scripts',
  'watch:styles',
  'watch:images',
  'watch:other',
]);
