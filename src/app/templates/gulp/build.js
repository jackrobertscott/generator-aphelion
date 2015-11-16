'use strict';

var gulp = require('gulp');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var minify = require('gulp-minify-html');
var del = require('del');
var config = require('./config');
var help = require('./gulp/help');

gulp.task('build', [
  'clean:build',
  'compile',
], function() {
  var htmlFilter = filter('**/*.html', {
    restore: true
  });
  var jsFilter = filter('**/*.js', {
    restore: true
  });
  var cssFilter = filter('**/*.css', {
    restore: true
  });

  return gulp.src(help.filter(config.tmp, ''))
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
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
      .pipe(concat('styles.min.css'))
      .pipe(csso())
    .pipe(cssFilter.restore)
    .pipe(gulp.dest(config.dist));
});

gulp.task('clean:build', function() {
  return del(config.dist);
});
