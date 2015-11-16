'use strict';

var path = require('path');
var gulp = require('gulp');<% if (jade || nunjucks) { %>
var plumber = require('gulp-plumber');
var data = require('gulp-data');<% } %><% if (jade) { %>
var jade = require('gulp-jade');<% } %><% if (nunjucks) { %>
var nunjucks = require('gulp-nunjucks-render');<% } %>
var config = require('../config');
var help = require('./help');

gulp.task('markups', [
  'html',<% if (jade) { %>
  'jade',<% } %><% if (nunjucks) { %>
  'nunjucks',<% } %>
]);

gulp.task('watch:markups', function() {<% if (html) { %>
  gulp.watch(path.join(config.src, '**/*.html'), ['html', 'reload']);<% } %><% if (jade) { %>
  gulp.watch(path.join(config.src, '**/*.jade'), ['jade', 'reload']);<% } %><% if (nunjucks) { %>
  gulp.watch(path.join(config.src, '**/*.nunjucks'), ['nunjucks', 'reload']);<% } %>
});

gulp.task('html', function() {
  return gulp.src(help.filter(config.src, '.html'))
    .pipe(gulp.dest(config.tmp));
});<% if (jade) { %>

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
});<% } %><% if (nunjucks) { %>

gulp.task('nunjucks', function() {
  return gulp.src(help.filter(config.src, '.nunjucks'))
    .pipe(plumber(help.plumb))
    .pipe(data(function(file) {
      return require(path.join(path.dirname(file.path), path.basename(file.path) + '.json'));
    }))
    .pipe(nunjucks())
    .pipe(gulp.dest(config.paths.tmp));
});<% } %>
