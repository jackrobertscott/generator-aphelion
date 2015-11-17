'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('aphelion:app', function() {
  describe('with all extra features', function() {
    describe('passing options', function() {
      before(function(done) {
        this.options = {
          jade: true,
          nunjucks: true,
          sass: true,
          less: true,
          coffee: true,
          es6: true,
        };
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions(this.options)
          .on('end', done);
      });

      it('creates app files', function() {
        assert.file([
          '.gitignore',
          'bower.json',
          'package.json',
          'config.json',
          'gulpfile.js',
          'gulp/build.js',
          'gulp/compile.js',
          'gulp/deploy.js',
          'gulp/help.js',
          'gulp/images.js',
          'gulp/markups.js',
          'gulp/other.js',
          'gulp/scripts.js',
          'gulp/serve.js',
          'gulp/styles.js',
        ]);
      });

      it('contains correct gulp tasks', function() {
        assert.fileContent([
          ['gulp/markups.js', 'gulp.task(\'jade\''],
          ['gulp/markups.js', 'gulp.task(\'nunjucks\''],
          ['gulp/scripts.js', 'gulp.task(\'coffee\''],
          ['gulp/scripts.js', 'gulp.task(\'es6\''],
          ['gulp/styles.js', 'gulp.task(\'less\''],
          ['gulp/styles.js', 'gulp.task(\'sass\''],
        ]);
      });

      it('contains correct package.json dependencies', function() {
        assert.fileContent([
          ['package.json', 'gulp-jade'],
          ['package.json', 'gulp-nunjucks-render'],
          ['package.json', 'gulp-coffee'],
          ['package.json', 'gulp-babel'],
          ['package.json', 'gulp-less'],
          ['package.json', 'gulp-sass'],
        ]);
      });
    });

    describe('passing prompts', function() {
      before(function(done) {
        this.prompts = {
          markups: ['jade', 'nunjucks'],
          styles: ['sass', 'less'],
          scripts: ['coffee', 'es6'],
        };
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts(this.prompts)
          .on('end', done);
      });

      it('creates app files', function() {
        assert.file([
          '.gitignore',
          'bower.json',
          'package.json',
          'config.json',
          'gulpfile.js',
          'gulp/build.js',
          'gulp/compile.js',
          'gulp/deploy.js',
          'gulp/help.js',
          'gulp/images.js',
          'gulp/markups.js',
          'gulp/other.js',
          'gulp/scripts.js',
          'gulp/serve.js',
          'gulp/styles.js',
        ]);
      });

      it('contains correct gulp tasks', function() {
        assert.fileContent([
          ['gulp/markups.js', 'gulp.task(\'jade\''],
          ['gulp/markups.js', 'gulp.task(\'nunjucks\''],
          ['gulp/scripts.js', 'gulp.task(\'coffee\''],
          ['gulp/scripts.js', 'gulp.task(\'es6\''],
          ['gulp/styles.js', 'gulp.task(\'less\''],
          ['gulp/styles.js', 'gulp.task(\'sass\''],
        ]);
      });

      it('contains correct package.json dependencies', function() {
        assert.fileContent([
          ['package.json', 'gulp-jade'],
          ['package.json', 'gulp-nunjucks-render'],
          ['package.json', 'gulp-coffee'],
          ['package.json', 'gulp-babel'],
          ['package.json', 'gulp-less'],
          ['package.json', 'gulp-sass'],
        ]);
      });
    });
  });
  describe('with no extra features', function() {
    describe('passing options', function() {
      before(function(done) {
        this.options = {
          jade: false,
          nunjucks: false,
          sass: false,
          less: false,
          coffee: false,
          es6: false,
        };
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions(this.options)
          .on('end', done);
      });

      it('creates app files', function() {
        assert.file([
          '.gitignore',
          'bower.json',
          'package.json',
          'config.json',
          'gulpfile.js',
          'gulp/build.js',
          'gulp/compile.js',
          'gulp/deploy.js',
          'gulp/help.js',
          'gulp/images.js',
          'gulp/markups.js',
          'gulp/other.js',
          'gulp/scripts.js',
          'gulp/serve.js',
          'gulp/styles.js',
        ]);
      });

      it('does not contain extra gulp tasks', function() {
        assert.noFileContent([
          ['gulp/markups.js', 'gulp.task(\'jade\''],
          ['gulp/markups.js', 'gulp.task(\'nunjucks\''],
          ['gulp/scripts.js', 'gulp.task(\'coffee\''],
          ['gulp/scripts.js', 'gulp.task(\'es6\''],
          ['gulp/styles.js', 'gulp.task(\'less\''],
          ['gulp/styles.js', 'gulp.task(\'sass\''],
        ]);
      });

      it('does not contain extra package.json dependencies', function() {
        assert.noFileContent([
          ['package.json', 'gulp-jade'],
          ['package.json', 'gulp-nunjucks-render'],
          ['package.json', 'gulp-coffee'],
          ['package.json', 'gulp-babel'],
          ['package.json', 'gulp-less'],
          ['package.json', 'gulp-sass'],
        ]);
      });
    });

    describe('passing prompts', function() {
      before(function(done) {
        this.prompts = {
          markups: [],
          styles: [],
          scripts: [],
        };
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts(this.prompts)
          .on('end', done);
      });

      it('creates app files', function() {
        assert.file([
          '.gitignore',
          'bower.json',
          'package.json',
          'config.json',
          'gulpfile.js',
          'gulp/build.js',
          'gulp/compile.js',
          'gulp/deploy.js',
          'gulp/help.js',
          'gulp/images.js',
          'gulp/markups.js',
          'gulp/other.js',
          'gulp/scripts.js',
          'gulp/serve.js',
          'gulp/styles.js',
        ]);
      });

      it('does not contain extra gulp tasks', function() {
        assert.noFileContent([
          ['gulp/markups.js', 'gulp.task(\'jade\''],
          ['gulp/markups.js', 'gulp.task(\'nunjucks\''],
          ['gulp/scripts.js', 'gulp.task(\'coffee\''],
          ['gulp/scripts.js', 'gulp.task(\'es6\''],
          ['gulp/styles.js', 'gulp.task(\'less\''],
          ['gulp/styles.js', 'gulp.task(\'sass\''],
        ]);
      });

      it('does not contain extra package.json dependencies', function() {
        assert.noFileContent([
          ['package.json', 'gulp-jade'],
          ['package.json', 'gulp-nunjucks-render'],
          ['package.json', 'gulp-coffee'],
          ['package.json', 'gulp-babel'],
          ['package.json', 'gulp-less'],
          ['package.json', 'gulp-sass'],
        ]);
      });
    });
  });
});
