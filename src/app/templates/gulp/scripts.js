'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var coffee = require('gulp-coffee');
var babel = require('gulp-babel');

var config = require('../config');
var help = require('./help');

gulp.task('scripts', [<% if (js) { %>
  'js'<% } %><% if (coffee) { %>
  'coffee'<% } %><% if (es6) { %>
  'es6'<% } %>
]);<% if (js) { %>

gulp.task('js', function() {
  return gulp.src(help.src('.js'))
    .pipe(gulp.dest(config.tmp));
});<% } %><% if (coffee) { %>

gulp.task('coffee', function() {
  return gulp.src(help.src('.coffee'))
    .pipe(plumber(help.plumb))
    .pipe(gulpif(!!config.sourcemaps, sourcemaps.init()))
    .pipe(coffee())
    .pipe(gulpif(!!config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.tmp));
});<% } %><% if (es6) { %>

gulp.task('es6', function() {
  return gulp.src(help.src('.es6'))
    .pipe(plumber(help.plumb))
    .pipe(gulpif(!!config.sourcemaps, sourcemaps.init()))
    .pipe(babel())
    .pipe(gulpif(!!config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.tmp));
});<% } %>
