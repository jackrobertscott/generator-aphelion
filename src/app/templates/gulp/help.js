'use strict';

var path = require('path');
var jade = require('jade');
var nunjucks = require('nunjucks');
var _ = require('lodash');
var gutil = require('gulp-util');
var config = require('../config');
var help = module.exports = {};

help.plumb = function plumb(error) {
  gutil.beep();
  gutil.log(error);
  this.emit('end'); // need this
};

help.filter = function filter(dir, ext) {
  return [
    path.join(dir, '**/*' + ext),
    '!' + path.join(dir, '**/_*{/**,}'),
  ];
};

help.locals = function locals(file) {
  return _.assign(help._fileData(file), {
    partial: help._partial,
  });
};

help._fileData = function _fileData(file) {
  var data;
  try {
    data = help._uncached(
      path.join(path.dirname(file.path),
      path.basename(file.path, path.extname(file.path)) + '.json')
    );
  } catch (e) {
    data = {};
  }
  return data;
};

help._uncached = function _uncached(_module) {
  delete require.cache[require.resolve(_module)];
  return require(_module);
};

help._partial = function _partial(file, data) {
  var ext = path.extname(file);
  file = path.join(__dirname, '..', config.paths.src, file);
  data = _.assign(help._fileData(file), data || {});
  switch (ext) {
    case '.jade':
      return jade.renderFile(file, data);
    case '.nunjucks':
      return nunjucks.render(file, data);
    default:
      throw new Error('partial with extension ' + ext + ' is not supported');
  }
};
