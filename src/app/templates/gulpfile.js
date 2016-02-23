'use strict';

var gulp = require('gulp');

require('require-dir')('./gulp');

gulp.task('compile', gulp.series(
  'clean:tmp',
  gulp.parallel(
    'html'<% if (jade) { %>,
    'jade'<% } %><% if (nunjucks) { %>,
    'nunjucks'<% } %><% if (jade || nunjucks) { %>,
    'markdown'<% } %>,
    'js'<% if (ts) { %>,
    'ts'<% } %><% if (coffee) { %>,
    'coffee'<% } %>,
    'css'<% if (less) { %>,
    'less'<% } %><% if (sass) { %>,
    'sass'<% } %>,
    'other'
  ),
  'inject:tmp'
));

gulp.task('watch', gulp.parallel(
  'watch:html'<% if (jade) { %>,
  'watch:jade'<% } %><% if (nunjucks) { %>,
  'watch:nunjucks'<% } %><% if (jade || nunjucks) { %>,
  'watch:markdown'<% } %>,
  'watch:js'<% if (ts) { %>,
  'watch:ts'<% } %><% if (coffee) { %>,
  'watch:coffee'<% } %>,
  'watch:css'<% if (less) { %>,
  'watch:less'<% } %><% if (sass) { %>,
  'watch:sass'<% } %>
));

gulp.task('build', gulp.series(
  'compile',
  'clean:build',
  'compress',
  'inject:build'
));

gulp.task('serve', gulp.series(
  'compile',
  'browser-sync:tmp',
  'watch'
));

gulp.task('serve:nowatch', gulp.series(
  'compile',
  'browser-sync:tmp',
  'watch'
));

gulp.task('serve:build', gulp.series(
  'build',
  'browser-sync:build'
));

gulp.task('deploy', gulp.series(
  'build',
  'upload:build'
));

gulp.task('deploy:nobuild', gulp.series(
  'compile',
  'upload:tmp'
));
