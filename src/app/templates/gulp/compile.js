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
    'bower',
  ], 'inject:compile', cb);
});

gulp.task('bower', function() {
  return gulp.src(bowerFiles())
    .pipe(gulp.dest(path.join(config.paths.tmp, 'vendor')));
});

gulp.task('inject:compile', function() {
  var sources = gulp.src([
    path.join(config.paths.tmp, '**/*.js'),
    path.join(config.paths.tmp, '**/*.css'),
    '!' + path.join(config.paths.tmp, 'vendor/*.js'),
    '!' + path.join(config.paths.tmp, 'vendor/*.css'),
  ], {
    read: false,
  });
  var vendor = gulp.src([
    path.join(config.paths.tmp, 'vendor/*.js'),
    path.join(config.paths.tmp, 'vendor/*.css'),
  ], {
    read: false,
  });

  return gulp.src(path.join(config.paths.tmp, '**/*.html'))
    .pipe(inject(sources, {
      relative: true,
    }))
    .pipe(inject(vendor, {
      relative: true,
      name: 'bower',
    }))
    .pipe(gulp.dest(config.paths.tmp));
});

gulp.task('clean:compile', function() {
  return del(config.paths.tmp);
});
