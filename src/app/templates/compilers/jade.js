'use strict';

var path = require('path');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var data = require('gulp-data');
var jade = require('gulp-jade');
var help = require('./help');
var config = require('./config');

gulp.task('jade', function() {
  return gulp.src(help.filter(config.src, '.jade'))
    .pipe(plumber(help.plumb))
    .pipe(data(function(file) {
      return require(path.join(path.dirname(file.path), path.basename(file.path) + '.json'));
    }))
    .pipe(jade({
      pretty: true,
    }))
    .pipe(gulp.dest(config.paths.tmp));
});
