'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var help = require('./help');
var config = require('./config');

gulp.task('sass', function() {
  return gulp.src(help.src('.{sass,scss}'))
    .pipe(plumber(help.plumb))
    .pipe(gulpif(!!config.sourcemaps, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(!!config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.paths.tmp));
});
