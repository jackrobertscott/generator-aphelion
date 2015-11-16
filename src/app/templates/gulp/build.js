'use strict';

var gulp = require('gulp');
var filter = require('gulp-filter');
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
    // code...
    .pipe(htmlFilter.restore)
    .pipe(jsFilter)
    // code...
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    // code...
    .pipe(cssFilter.restore)
    .pipe(gulp.dest(config.dist));
});

gulp.task('clean:build', function() {
  return del(config.dist);
});
