'use strict';

var gulp = require('gulp');
var config = require('./config');
var help = require('./help');

gulp.task('js', function() {
  return gulp.src(help.src('.js'))
    .pipe(gulp.dest(config.tmp));
});
