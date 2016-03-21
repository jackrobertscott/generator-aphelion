'use strict';

var path = require('path');
var gulp = require('gulp');
var rev = require('gulp-rev');
var gulpif = require('gulp-if');
var filter = require('gulp-filter');
var useref = require('gulp-useref');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var minify = require('gulp-minify-html');
var config = require('../config');

gulp.task('compress', function() {
  var htmlFilter = filter('**/*.html', {
    restore: true,
  });
  var jsFilter = filter('**/*.js', {
    restore: true,
  });
  var cssFilter = filter('**/*.css', {
    restore: true,
  });

  return gulp.src(path.join(config.paths.tmp, '**'))
    // .pipe(htmlFilter)
    // .pipe(minify({
    //   comments: true,
    //   conditionals: true,
    //   spare: true,
    // }))
    // .pipe(htmlFilter.restore)
    .pipe(jsFilter)
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(concat('styles.min.css'))
    .pipe(csso())
    .pipe(rev())
    .pipe(cssFilter.restore)
    .pipe(gulp.dest(config.paths.dist));
});
