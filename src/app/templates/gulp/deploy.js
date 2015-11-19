'use strict';

var path = require('path');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var file = require('gulp-file');
var ghPages = require('gulp-gh-pages');
var config = require('../config');

gulp.task('deploy', ['build'], function() {
  return gulp.src(path.join(config.paths.dist, '**'))
    .pipe(gulpif(!!config.cname, file('CNAME', config.cname)))
    .pipe(ghPages());
});

gulp.task('deploy:uncompressed', ['compile'], function() {
  return gulp.src(path.join(config.paths.tmp, '**'))
    .pipe(gulpif(!!config.cname, file('CNAME', config.cname)))
    .pipe(ghPages());
});
