'use strict';

var path = require('path');
var fs = require('fs-extra');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('aphelion:page', function() {
  describe('passing options', function() {
    describe('jade + sass', function() {
      before(function(done) {
        this.site = fs.readJsonSync(path.join(__dirname, 'common', 'config.json'));
        this.options = {
          path: 'page',
          markups: 'jade',
          styles: 'sass',
        };
        helpers.run(path.join(__dirname, '../generators/page'))
          .inTmpDir(function(dir) {
            fs.copySync(path.join(__dirname, 'common'), dir);
          })
          .withOptions(this.options)
          .on('end', done);
      });

      it('creates page files', function() {
        assert.file([
          path.join(this.site.paths.src, this.options.path, '_layout.jade'),
          path.join(this.site.paths.src, this.options.path, 'index.jade'),
          path.join(this.site.paths.src, this.options.path, 'styles.sass'),
        ]);
      });
    });

    describe('jade + less', function() {
      before(function(done) {
        this.site = fs.readJsonSync(path.join(__dirname, 'common', 'config.json'));
        this.options = {
          path: 'page',
          markups: 'jade',
          styles: 'less',
        };
        helpers.run(path.join(__dirname, '../generators/page'))
          .inTmpDir(function(dir) {
            fs.copySync(path.join(__dirname, 'common'), dir);
          })
          .withOptions(this.options)
          .on('end', done);
      });

      it('creates page files', function() {
        assert.file([
          path.join(this.site.paths.src, this.options.path, '_layout.jade'),
          path.join(this.site.paths.src, this.options.path, 'index.jade'),
          path.join(this.site.paths.src, this.options.path, 'styles.less'),
        ]);
      });
    });

    describe('nunjucks + scss', function() {
      before(function(done) {
        this.site = fs.readJsonSync(path.join(__dirname, 'common', 'config.json'));
        this.options = {
          path: 'page',
          markups: 'nunjucks',
          styles: 'scss',
        };
        helpers.run(path.join(__dirname, '../generators/page'))
          .inTmpDir(function(dir) {
            fs.copySync(path.join(__dirname, 'common'), dir);
          })
          .withOptions(this.options)
          .on('end', done);
      });

      it('creates page files', function() {
        assert.file([
          path.join(this.site.paths.src, this.options.path, '_layout.nunjucks'),
          path.join(this.site.paths.src, this.options.path, 'index.nunjucks'),
          path.join(this.site.paths.src, this.options.path, 'styles.scss'),
        ]);
      });
    });

    describe('html + css', function() {
      before(function(done) {
        this.site = fs.readJsonSync(path.join(__dirname, 'common', 'config.json'));
        this.options = {
          path: 'page',
          markups: 'html',
          styles: 'css',
        };
        helpers.run(path.join(__dirname, '../generators/page'))
          .inTmpDir(function(dir) {
            fs.copySync(path.join(__dirname, 'common'), dir);
          })
          .withOptions(this.options)
          .on('end', done);
      });

      it('creates page files', function() {
        assert.file([
          path.join(this.site.paths.src, this.options.path, 'index.html'),
          path.join(this.site.paths.src, this.options.path, 'styles.css'),
        ]);
      });
    });
  });
  describe('passing prompts', function() {
    describe('jade + sass', function() {
      before(function(done) {
        this.site = fs.readJsonSync(path.join(__dirname, 'common', 'config.json'));
        this.prompts = {
          path: 'page',
          markups: 'jade',
          styles: 'sass',
        };
        helpers.run(path.join(__dirname, '../generators/page'))
          .inTmpDir(function(dir) {
            fs.copySync(path.join(__dirname, 'common'), dir);
          })
          .withPrompts(this.prompts)
          .on('end', done);
      });

      it('creates page files', function() {
        assert.file([
          path.join(this.site.paths.src, this.prompts.path, '_layout.jade'),
          path.join(this.site.paths.src, this.prompts.path, 'index.jade'),
          path.join(this.site.paths.src, this.prompts.path, 'styles.sass'),
        ]);
      });
    });

    describe('jade + less', function() {
      before(function(done) {
        this.site = fs.readJsonSync(path.join(__dirname, 'common', 'config.json'));
        this.prompts = {
          path: 'page',
          markups: 'jade',
          styles: 'less',
        };
        helpers.run(path.join(__dirname, '../generators/page'))
          .inTmpDir(function(dir) {
            fs.copySync(path.join(__dirname, 'common'), dir);
          })
          .withPrompts(this.prompts)
          .on('end', done);
      });

      it('creates page files', function() {
        assert.file([
          path.join(this.site.paths.src, this.prompts.path, '_layout.jade'),
          path.join(this.site.paths.src, this.prompts.path, 'index.jade'),
          path.join(this.site.paths.src, this.prompts.path, 'styles.less'),
        ]);
      });
    });

    describe('nunjucks + scss', function() {
      before(function(done) {
        this.site = fs.readJsonSync(path.join(__dirname, 'common', 'config.json'));
        this.prompts = {
          path: 'page',
          markups: 'nunjucks',
          styles: 'scss',
        };
        helpers.run(path.join(__dirname, '../generators/page'))
          .inTmpDir(function(dir) {
            fs.copySync(path.join(__dirname, 'common'), dir);
          })
          .withPrompts(this.prompts)
          .on('end', done);
      });

      it('creates page files', function() {
        assert.file([
          path.join(this.site.paths.src, this.prompts.path, '_layout.nunjucks'),
          path.join(this.site.paths.src, this.prompts.path, 'index.nunjucks'),
          path.join(this.site.paths.src, this.prompts.path, 'styles.scss'),
        ]);
      });
    });

    describe('html + css', function() {
      before(function(done) {
        this.site = fs.readJsonSync(path.join(__dirname, 'common', 'config.json'));
        this.prompts = {
          path: 'page',
          markups: 'html',
          styles: 'css',
        };
        helpers.run(path.join(__dirname, '../generators/page'))
          .inTmpDir(function(dir) {
            fs.copySync(path.join(__dirname, 'common'), dir);
          })
          .withPrompts(this.prompts)
          .on('end', done);
      });

      it('creates page files', function() {
        assert.file([
          path.join(this.site.paths.src, this.prompts.path, 'index.html'),
          path.join(this.site.paths.src, this.prompts.path, 'styles.css'),
        ]);
      });
    });
  });
});
