'use strict';

var path = require('path');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var config = require('../config');
var help = require('./help');

gulp.task('images', function() {
  return gulp.src(help.filter(config.src, '.{gif,jpeg,jpg,png,svg}'))
    .pipe(imagemin())
    .pipe(gulp.dest(config.paths.tmp));
});

gulp.task('watch:images', function() {
  gulp.watch(path.join(config.src, '**/*.{gif,jpeg,jpg,png,svg}'), ['images', 'reload']);
});
