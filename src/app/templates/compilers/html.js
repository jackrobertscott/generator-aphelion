'use strict';

var gulp = require('gulp');
var config = require('./config');
var help = require('./help');

gulp.task('html', function() {
  return gulp.src(help.filter(config.src, '.html'))
    .pipe(gulp.dest(config.tmp));
});
