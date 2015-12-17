'use strict';

var path = require('path');
var gulp = require('gulp');
var inject = require('gulp-inject');
var config = require('../config');

gulp.task('inject:tmp', function() {
  var js = gulp.src(path.join(config.paths.tmp, '**/*.js'), {
    read: false,
  });
  var css = gulp.src(path.join(config.paths.tmp, '**/*.css'), {
    read: false,
  });

  return gulp.src(path.join(config.paths.tmp, '**/*.html'))
    .pipe(inject(js, {
      relative: true,
    }))
    .pipe(inject(css, {
      relative: true,
    }))
    .pipe(gulp.dest(config.paths.tmp));
});

gulp.task('inject:build', function() {
  var js = gulp.src(path.join(config.paths.dist, '**/*.js'), {
    read: false,
  });
  var css = gulp.src(path.join(config.paths.dist, '**/*.css'), {
    read: false,
  });

  return gulp.src(path.join(config.paths.dist, '**/*.html'))
    .pipe(inject(js, {
      relative: true,
    }))
    .pipe(inject(css, {
      relative: true,
    }))
    .pipe(gulp.dest(config.paths.dist));
});
