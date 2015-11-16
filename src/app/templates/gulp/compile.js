'use strict';

var path = require('path');
var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var del = require('del');
var sequence = require('run-sequence');
var config = require('../config');
var help = require('./help');

gulp.task('compile', ['clean:compile'], function(cb) {
  sequence('clean:compile', [
    'markups',
    'scripts',
    'styles',
    'images',
    'other',
    'vendor',
  ], 'inject:compile', cb);
});

gulp.task('vendor', function() {
  return gulp.src(bowerFiles())
    .pipe(gulp.dest(path.join(config.tmp, 'vendor')));
});

gulp.task('inject:compile', function() {
  var sources = gulp.src([
    path.join(config.tmp, '**/*.js'),
    path.join(config.tmp, '**/*.css'),
    '!' + path.join(config.tmp, 'vendor/*.js'),
    '!' + path.join(config.tmp, 'vendor/*.css'),
  ], {
    read: false,
  });
  var vendor = gulp.src([
    path.join(config.tmp, 'vendor/*.js'),
    path.join(config.tmp, 'vendor/*.css'),
  ], {
    read: false,
  });

  return gulp.src(path.join(config.tmp, '**/*.html'))
    .pipe(inject(sources, {
      relative: true,
    }))
    .pipe(inject(vendor, {
      relative: true,
      name: 'bower',
    }))
    .pipe(gulp.dest(config.tmp));
});

gulp.task('clean:compile', function() {
  return del(config.tmp);
});
