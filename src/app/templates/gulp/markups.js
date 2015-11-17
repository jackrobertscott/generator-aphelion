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

gulp.task('watch:markups', function() {
  gulp.watch(path.join(config.paths.src, '**/*.html'), ['html', 'reload']);<% if (jade) { %>
  gulp.watch(path.join(config.paths.src, '**/*.jade'), ['jade', 'reload']);<% } %><% if (nunjucks) { %>
  gulp.watch(path.join(config.paths.src, '**/*.nunjucks'), ['nunjucks', 'reload']);<% } %>
});

gulp.task('html', function() {
  return gulp.src(help.filter(config.paths.src, '.html'))
    .pipe(gulp.dest(config.paths.tmp));
});<% if (jade) { %>

gulp.task('jade', function() {
  return gulp.src(help.filter(config.paths.src, '.jade'))
    .pipe(plumber(help.plumb))
    .pipe(data(function(file) {
      try {
        return require(path.join(path.dirname(file.path), path.basename(file.path, path.extname(file.path)) + '.json'));
      } catch(e) {}
    }))
    .pipe(jade({
      pretty: true,
    }))
    .pipe(gulp.dest(config.paths.tmp));
});<% } %><% if (nunjucks) { %>

gulp.task('nunjucks', function() {
  return gulp.src(help.filter(config.paths.src, '.nunjucks'))
    .pipe(plumber(help.plumb))
    .pipe(data(function(file) {
      return require(path.join(path.dirname(file.path), path.basename(file.path, path.extname(file.path)) + '.json'));
    }))
    .pipe(nunjucks())
    .pipe(gulp.dest(config.paths.tmp));
});<% } %>
