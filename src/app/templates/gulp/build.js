'use strict';

var path = require('path');
var gulp = require('gulp');
var rev = require('gulp-rev');
var filter = require('gulp-filter');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var minify = require('gulp-minify-html');
var sequence = require('run-sequence');
var del = require('del');
var config = require('../config');
var help = require('./help');

gulp.task('build', ['clean:build'], function(cb) {
  sequence('compress', 'inject:build', cb);
});

gulp.task('compress', [
  'compile',
], function() {
  var htmlFilter = filter('**/*.html', {
    restore: true,
  });
  var jsFilter = filter(['**/*.js', '!vendor/*.js'], {
    restore: true,
  });
  var jsVendor = filter('vendor/*.js', {
    restore: true,
  });
  var cssFilter = filter(['**/*.css', '!vendor/*.css'], {
    restore: true,
  });
  var cssVendor = filter('vendor/*.css', {
    restore: true,
  });

  return gulp.src(help.filter(config.paths.tmp, ''))
    .pipe(htmlFilter)
      .pipe(minify({
        comments: true,
        conditionals: true,
        spare: true,
      }))
    .pipe(htmlFilter.restore)
    .pipe(jsFilter)
      .pipe(concat('scripts.min.js'))
      .pipe(uglify())
      .pipe(rev())
    .pipe(jsFilter.restore)
    .pipe(jsVendor)
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(rev())
    .pipe(jsVendor.restore)
    .pipe(cssFilter)
      .pipe(concat('styles.min.css'))
      .pipe(csso())
      .pipe(rev())
    .pipe(cssFilter.restore)
    .pipe(cssVendor)
      .pipe(concat('vendor.min.css'))
      .pipe(csso())
      .pipe(rev())
    .pipe(cssVendor.restore)
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('inject:build', function() {
  var sources = gulp.src([
    path.join(config.paths.dist, '*.js'),
    path.join(config.paths.dist, '*.css'),
    '!' + path.join(config.paths.dist, 'vendor*.js'),
    '!' + path.join(config.paths.dist, 'vendor*.css'),
  ], {
    read: false,
  });
  var vendor = gulp.src([
    path.join(config.paths.dist, 'vendor*.js'),
    path.join(config.paths.dist, 'vendor*.css'),
  ], {
    read: false,
  });

  return gulp.src(path.join(config.paths.dist, '**/*.html'))
    .pipe(inject(sources, {
      relative: true,
    }))
    .pipe(inject(vendor, {
      relative: true,
      name: 'bower',
    }))
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('clean:build', function() {
  return del(config.paths.dist);
});
