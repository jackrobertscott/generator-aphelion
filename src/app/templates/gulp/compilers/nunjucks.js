'use strict';

var path = require('path');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var data = require('gulp-data');
var nunjucks = require('gulp-nunjucks-render');
var help = require('./help');
var config = require('./config');

gulp.task('nunjucks', function() {
  return gulp.src(help.src('.{nj,nunjucks}'))
    .pipe(plumber(help.plumb))
    .pipe(data(function(file) {
      return require(path.join(path.dirname(file.path), path.basename(file.path) + '.json'));
    }))
    .pipe(nunjucks())
    .pipe(gulp.dest(config.paths.tmp));
});
