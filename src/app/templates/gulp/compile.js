'use strict';

var path = require('path');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var mainBowerFiles = require('main-bower-files');<% if (jade || nunjucks) { %>
var data = require('gulp-data');
var frontMatter = require('gulp-front-matter');
var markdown = require('gulp-markdown');
var layout = require('gulp-layout');<% } %><% if (jade) { %>
var jade = require('gulp-jade');<% } %><% if (nunjucks) { %>
var nunjucks = require('gulp-nunjucks-render');<% } %><% if (ts) { %>
var ts = require('gulp-typescript');<% } %><% if (coffee) { %>
var coffee = require('gulp-coffee');<% } %><% if (less) { %>
var less = require('gulp-less');<% } %><% if (sass) { %>
var sass = require('gulp-sass');<% } %>
var config = require('../config');
var helpers = require('./helpers');

gulp.task('html', function() {
  return gulp.src(helpers.src(config.paths.src, '.html'))
    .pipe(gulp.dest(config.paths.tmp));
});<% if (jade) { %>

gulp.task('jade', function() {
  return gulp.src(helpers.src(config.paths.src, '.jade'))
    .pipe(data(function(file) {
      return helpers.locals(file);
    }))
    .pipe(jade({
      pretty: true,
    }))
    .pipe(gulp.dest(config.paths.tmp));
});<% } %><% if (nunjucks) { %>

gulp.task('nunjucks', function() {
  return gulp.src(helpers.src(config.paths.src, '.nunjucks'))
    .pipe(data(function(file) {
      return helpers.locals(file);
    }))
    .pipe(nunjucks())
    .pipe(gulp.dest(config.paths.tmp));
});<% } %><% if (jade || nunjucks) { %>

gulp.task('markdown', function() {
  return gulp.src(helpers.src(config.paths.src, ['.md', '.markdown']))
    .pipe(frontMatter())
    .pipe(markdown())
    .pipe(layout(function(file) {
      var fmData = file.frontMatter;
      fmData.layout = helpers.absPath(fmData.layout);
      return fmData;
    }))
    .pipe(gulp.dest(config.paths.tmp));
});<% } %>

gulp.task('js', function() {
  return gulp.src(helpers.src(config.paths.src, '.js'))
    .pipe(gulp.dest(config.paths.tmp));
});<% if (ts) { %>

gulp.task('ts', function() {
  return gulp.src(helpers.src(config.paths.src, '.ts'))
    .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
    .pipe(ts())
    .js
    .pipe(gulpif(config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.paths.tmp));
});<% } %><% if (coffee) { %>

gulp.task('coffee', function() {
  return gulp.src(helpers.src(config.paths.src, '.coffee'))
    .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
    .pipe(coffee())
    .pipe(gulpif(config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.paths.tmp));
});<% } %>

gulp.task('css', function() {
  return gulp.src(helpers.src(config.paths.src, '.css'))
    .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
    .pipe(autoprefixer())
    .pipe(gulpif(config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.paths.tmp));
});<% if (less) { %>

gulp.task('less', function() {
  return gulp.src(helpers.src(config.paths.src, '.less'))
    .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulpif(config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.paths.tmp));
});<% } %><% if (sass) { %>

gulp.task('sass', function() {
  return gulp.src(helpers.src(config.paths.src, ['.sass', '.scss']))
    .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(config.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(config.paths.tmp));
});<% } %>

gulp.task('images', function() {
  return gulp.src(helpers.src(config.paths.src, ['.gif', '.jpeg', '.jpg', '.png', '.svg']))
    .pipe(imagemin())
    .pipe(gulp.dest(config.paths.tmp));
});

gulp.task('vendor', function() {
  return gulp.src(mainBowerFiles(config.bower))
    .pipe(gulp.dest(path.join(config.paths.tmp, 'vendor')));
});

gulp.task('other', function() {
  return gulp.src(helpers.other(config.paths.src))
    .pipe(gulp.dest(config.paths.tmp));
});
