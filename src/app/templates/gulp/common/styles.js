'use strict';

var gulp = require('gulp');

gulp.task('markups', gulp.parallel(<% if (coffee) { %>
  'coffee',<% } else if (es6) { %>
  'es6',<% } %>
  'js'
));
