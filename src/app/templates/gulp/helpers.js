'use strict';

var path = require('path');
var fs = require('fs');
var _ = require('lodash');<% if (jade) { %>
var jade = require('jade');<% } %><% if (nunjucks) { %>
var nunjucks = require('nunjucks');<% } %><% if (jade || nunjucks) { %>
var marked = require('marked');<% } %>
var config = require('../config');

function Helpers() {
  this.exts = [];
}

Helpers.prototype.filter = function filter(dir, ext) {
  return [
    path.join(dir, '**/*' + ext || ''),
    '!' + path.join(dir, '**/_*{/**,}'),
  ];
};

Helpers.prototype.src = function src(dir, exts) {
  var sources = [];
  if (Array.isArray(exts)) {
    exts.forEach(function(ext) {
      if (this.exts.indexOf(ext) === -1) {
        this.exts.push(ext);
      }
      sources = sources.concat(this.filter(dir, ext));
    }.bind(this));
  } else {
    if (this.exts.indexOf(exts) === -1) {
      this.exts.push(exts);
    }
    sources = sources.concat(this.filter(dir, exts));
  }
  return sources;
};

Helpers.prototype.watch = function watch(dir, exts) {
  var sources = [];
  if (Array.isArray(exts)) {
    exts.forEach(function(ext) {
      sources = sources.concat(path.join(dir, '**/*' + ext || ''));
    }.bind(this));
  } else {
    sources = sources.concat(path.join(dir, '**/*' + exts));
  }
  return sources;
};

Helpers.prototype.others = function others(dir) {
  return [
    path.join(dir, '**/*'),
    '!' + path.join(dir, '**/_*{/**,}'),
    '!' + path.join(dir, '**/*{' + this.exts.join(',') + '}'), // This doesn't work???
  ];
};<% if (jade || nunjucks) { %>

Helpers.prototype.locals = function locals(file) {
  return _.assign(this._fileData(file), {
    partial: this._partial,
  });
};

Helpers.prototype.absPath = function absPath(file) {
  return path.join(__dirname, '..', config.paths.src, file);
};

Helpers.prototype._fileData = function _fileData(file) {
  var data;
  try {
    data = this._uncached(
      path.join(path.dirname(file.path),
      path.basename(file.path, path.extname(file.path)) + '.json')
    );
  } catch (e) {
    data = {};
  }
  return data;
};

Helpers.prototype._uncached = function _uncached(_module) {
  delete require.cache[require.resolve(_module)];
  return require(_module);
};

Helpers.prototype._partial = function _partial(file, data) {
  var ext = path.extname(file);
  file = this.absPath(file);
  data = _.assign(this._fileData(file), data || {});
  switch (ext) {<% if (jade) { %>
    case '.jade':
      return jade.renderFile(file, data);<% } %><% if (nunjucks) { %>
    case '.nunjucks':
      return nunjucks.render(file, data);<% } %>
    case '.md':
    case '.markdown':
      return marked(fs.readFileSync(file));
    default:
      throw new Error('partial with extension ' + ext + ' is not supported');
  }
};<% } %>

module.exports = new Helpers();
