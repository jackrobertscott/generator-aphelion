'use strict';

var gulp = require('gulp');
var del = require('del');
var sequence = require('run-sequence');
var config = require('../config');
var help = require('./help');

gulp.task('compile', ['clean:compile'], function(cb) {
  sequence('clean:compile', [
    'markups',
    'scripts',
    'styles',
    'images', 
    'other',
  ], cb);
});

gulp.task('clean:compile', function() {
  return del(config.tmp);
});
