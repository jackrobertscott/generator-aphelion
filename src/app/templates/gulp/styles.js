'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var less = require('gulp-less');

var config = require('../config');
var help = require('./help');

gulp.task('styles', [<% if (css) { %>
  'css'<% } %><% if (less) { %>
  'less'<% } %><% if (sass) { %>
  'sass'<% } %>
]);<% if (css) { %>

gulp.task('css', function() {
  return gulp.src(help.src('.css'))
    .pipe(gulp.dest(config.tmp));
});<% } %><% if (less) { %>

gulp.task('less', function() {
  return gulp.src(help.src('.less'))
    .pipe(plumber(help.plumb))
    .pipe(gulpif(!!config.sourcemaps, sourcemaps.init()))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulpif(!!config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.paths.tmp));
});<% } %><% if (sass) { %>

gulp.task('sass', function() {
  return gulp.src(help.src('.{sass,scss}'))
    .pipe(plumber(help.plumb))
    .pipe(gulpif(!!config.sourcemaps, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(!!config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.paths.tmp));
});<% } %>
