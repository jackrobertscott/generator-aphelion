'use strict';

var path = require('path');
var gulp = require('gulp');<% if (jade || nunjucks) { %>
var plumber = require('gulp-plumber');
var data = require('gulp-data');<% } %><% if (jade) { %>
var jade = require('gulp-jade');<% } %><% if (nunjucks) { %>
var nunjucks = require('gulp-nunjucks-render');<% } %>
var sequence = require('run-sequence');
var config = require('../config');
var help = require('./help');

gulp.task('markups', [
  'html',<% if (jade) { %>
  'jade',<% } %><% if (nunjucks) { %>
  'nunjucks',<% } %>
]);

gulp.task('watch:markups', function() {
  gulp.watch(path.join(config.paths.src, '**/*.html'), function() {
    sequence('html', 'inject:compile', 'reload');
  });<% if (jade) { %>
  gulp.watch(path.join(config.paths.src, '**/*.jade'), function() {
    sequence('jade', 'inject:compile', 'reload');
  });<% } %><% if (nunjucks) { %>
  gulp.watch(path.join(config.paths.src, '**/*.nunjucks'), function() {
    sequence('nunjucks', 'inject:compile', 'reload');
  });<% } %>
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
        return help.requireUncached(path.join(path.dirname(file.path), path.basename(file.path, path.extname(file.path)) + '.json'));
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
      return help.requireUncached(path.join(path.dirname(file.path), path.basename(file.path, path.extname(file.path)) + '.json'));
    }))
    .pipe(nunjucks())
    .pipe(gulp.dest(config.paths.tmp));
});<% } %>
