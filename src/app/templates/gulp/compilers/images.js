'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var config = require('./config');
var help = require('./help');

gulp.task('images', function() {
  return gulp.src(help.src('.{gif,jpeg,jpg,png,svg}'))
    .pipe(imagemin())
    .pipe(gulp.dest(config.paths.tmp));
});
