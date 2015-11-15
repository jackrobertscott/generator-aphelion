'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('compile', [
  'babel',
  'templates',
]);

gulp.task('babel', function() {
  return gulp.src([
      'src/**',
      '!src/**/templates/**',
    ])
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('generators'));
});

gulp.task('templates', function() {
  return gulp.src('src/**/templates/**')
    .pipe(gulp.dest('generators'));
});
