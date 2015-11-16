'use strict';

var path = require('path');
var gulp = require('gulp');<% if (less || sass) { %>
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');<% } %><% if (less) { %>
var less = require('gulp-less');<% } %><% if (sass) { %>
var sass = require('gulp-sass');<% } %>
var config = require('../config');
var help = require('./help');

gulp.task('styles', [
  'css',<% if (less) { %>
  'less',<% } %><% if (sass) { %>
  'sass',<% } %>
]);

gulp.task('watch:styles', function() {
  gulp.watch(path.join(config.src, '**/*.css'), ['css', 'reload']);<% if (less) { %>
  gulp.watch(path.join(config.src, '**/*.less'), ['less', 'reload']);<% } %><% if (sass) { %>
  gulp.watch(path.join(config.src, '**/*.{sass,scss}'), ['sass', 'reload']);<% } %>
});

gulp.task('css', function() {
  return gulp.src(help.filter(config.src, '.css'))
    .pipe(plumber(help.plumb))
    .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
    .pipe(autoprefixer())
    .pipe(gulpif(config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.tmp));
});<% if (less) { %>

gulp.task('less', function() {
  return gulp.src(help.filter(config.src, '.less'))
    .pipe(plumber(help.plumb))
    .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulpif(config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.paths.tmp));
});<% } %><% if (sass) { %>

gulp.task('sass', function() {
  return gulp.src(help.filter(config.src, '.{sass,scss}'))
    .pipe(plumber(help.plumb))
    .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.paths.tmp));
});<% } %>
