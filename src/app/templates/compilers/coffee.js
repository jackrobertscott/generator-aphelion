'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var coffee = require('gulp-coffee');
var config = require('./config');
var help = require('./help');

gulp.task('coffee', function() {
  return gulp.src(help.src('.coffee'))
    .pipe(plumber(help.plumb))
    .pipe(gulpif(!!config.sourcemaps, sourcemaps.init()))
    .pipe(coffee())
    .pipe(gulpif(!!config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.tmp));
});
