'use strict';

var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');

var config = {
  src: 'src',
  dest: 'es6',
};

gulp.task('compile', [
  'babel',
  'templates',
]);

gulp.task('clean', function() {
  return del(config.dest);
});

gulp.task('babel', ['clean'], function() {
  return gulp.src([
      path.join(config.src, '**'),
      '!' + path.join(config.src, '**', 'templates', '**'),
    ])
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('generators'));
});

gulp.task('templates', ['clean'], function() {
  return gulp.src('src/**/templates/**')
    .pipe(gulp.dest('generators'));
});
