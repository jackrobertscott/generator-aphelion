'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var gulpif = require('gulp-if');
var help = require('./help');
var config = require('./config');

gulp.task('less', function() {
  return gulp.src(help.src('.less'))
    .pipe(plumber(help.plumb))
    .pipe(gulpif(!!config.sourcemaps, sourcemaps.init()))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulpif(!!config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.paths.tmp));
});
