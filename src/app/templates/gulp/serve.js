'use strict';

var gulp = require('gulp');
var sequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var config = require('../config');
var help = require('./help');

gulp.task('serve', [
  'compile',
], function(cb) {
  sequence('browser-sync:compile', 'watch', cb);
});

gulp.task('browser-sync:compile', function(cb) {
  browserSync.init({
    server: config.paths.tmp,
  }, cb);
});

gulp.task('watch', [
  'watch:markups',
  'watch:scripts',
  'watch:styles',
  'watch:images',
  'watch:other',
]);

gulp.task('serve:production', [
  'build',
], function(cb) {
  sequence('browser-sync:build', cb);
});

gulp.task('browser-sync:build', function(cb) {
  browserSync.init({
    server: config.paths.dist,
  }, cb);
});

gulp.task('reload', browserSync.reload);
