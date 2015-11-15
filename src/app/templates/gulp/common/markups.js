'use strict';

var gulp = require('gulp');

gulp.task('markups', gulp.parallel(<% if (jade) { %>
  'jade',<% } else if (nunjucks) { %>
  'nunjucks',<% } %>
  'html'
));
