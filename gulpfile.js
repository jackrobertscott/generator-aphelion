'use strict';

var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');

var config = {
  src: 'src',
  dest: 'generators',
};

gulp.task('clean', function() {
  return del(config.dest);
});

gulp.task('compile', ['clean'], function() {
  return gulp.src(path.join(config.src, '**'), {
      dot: true
    })
    .pipe(babel({
      presets: ['es2015'],
      ignore: [
        '**/templates/**',
        '**/*.json',
      ],
    }))
    .pipe(gulp.dest(config.dest));
});
