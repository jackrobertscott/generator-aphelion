'use strict';

var gulp = require('gulp');

gulp.task('markups', gulp.parallel(<% if (sass) { %>
  'sass',<% } else if (less) { %>
  'less',<% } %>
  'css'
));
