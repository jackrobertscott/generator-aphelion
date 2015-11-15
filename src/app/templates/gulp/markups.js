'use strict';

var path = require('path');
var gulp = require('gulp');<% if (jade || nunjucks) { %>
var plumber = require('gulp-plumber');
var data = require('gulp-data');<% } %><% if (jade) { %>
var jade = require('gulp-jade');<% } %><% if (nunjucks) { %>
var nunjucks = require('gulp-nunjucks-render');<% } %>

var config = require('../config');
var help = require('./help');

gulp.task('markups', [<% if (html) { %>
  'html'<% } %><% if (jade) { %>
  'jade'<% } %><% if (nunjucks) { %>
  'nunjucks'<% } %>
]);<% if (html) { %>

gulp.task('html', function() {
  return gulp.src(help.src('.html'))
    .pipe(gulp.dest(config.tmp));
});<% } %><% if (jade) { %>

gulp.task('jade', function() {
  return gulp.src(help.src('.jade'))
    .pipe(plumber(help.plumb))
    .pipe(data(function(file) {
      return require(path.join(path.dirname(file.path), path.basename(file.path) + '.json'));
    }))
    .pipe(jade({
      pretty: true,
    }))
    .pipe(gulp.dest(config.paths.tmp));
});<% } %><% if (nunjucks) { %>

gulp.task('nunjucks', function() {
  return gulp.src(help.src('.{nj,nunjucks}'))
    .pipe(plumber(help.plumb))
    .pipe(data(function(file) {
      return require(path.join(path.dirname(file.path), path.basename(file.path) + '.json'));
    }))
    .pipe(nunjucks())
    .pipe(gulp.dest(config.paths.tmp));
});<% } %>
