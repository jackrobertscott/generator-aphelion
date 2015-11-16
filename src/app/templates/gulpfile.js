'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
var browserSync = require('browser-sync').create();
var config = require('./config');
var help = require('./gulp/help');

/**
 * Require tasks files
 */
requireDir('./gulp');

gulp.task('serve', [
  'compile',
  'watch',
], function(cb) {
  browserSync.init({
    server: config.tmp,
  }, cb);
});

gulp.task('reload', browserSync.reload);

gulp.task('compile', [
  'markups',
  'scripts',
  'styles',
  'images',
  'other',
]);

gulp.task('watch', [
  'watch:markups',
  'watch:scripts',
  'watch:styles',
  'watch:images',
  'watch:other',
]);
