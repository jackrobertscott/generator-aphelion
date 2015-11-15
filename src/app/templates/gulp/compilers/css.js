'use strict';

var gulp = require('gulp');
var config = require('./config');
var help = require('./help');

gulp.task('css', function() {
  return gulp.src(help.src('.css'))
    .pipe(gulp.dest(config.tmp));
});
