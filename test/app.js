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
          ts: true,
          framework: 'none',
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
          'README.md',
          'gulp/clean.js',
          'gulp/compile.js',
          'gulp/compress.js',
          'gulp/helpers.js',
          'gulp/inject.js',
          'gulp/upload.js',
          'gulp/watch.js',
        ]);
      });

      it('contains correct gulp tasks', function() {
        assert.fileContent([
          ['gulp/compile.js', 'gulp.task(\'jade\''],
          ['gulp/compile.js', 'gulp.task(\'nunjucks\''],
          ['gulp/compile.js', 'gulp.task(\'coffee\''],
          ['gulp/compile.js', 'gulp.task(\'ts\''],
          ['gulp/compile.js', 'gulp.task(\'less\''],
          ['gulp/compile.js', 'gulp.task(\'sass\''],
        ]);
      });

      it('contains correct package.json dependencies', function() {
        assert.fileContent([
          ['package.json', 'gulp-jade'],
          ['package.json', 'gulp-nunjucks-render'],
          ['package.json', 'gulp-coffee'],
          ['package.json', 'gulp-typescript'],
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
          scripts: ['coffee', 'ts'],
          framework: 'none',
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
          'README.md',
          'gulp/clean.js',
          'gulp/compile.js',
          'gulp/compress.js',
          'gulp/helpers.js',
          'gulp/inject.js',
          'gulp/upload.js',
          'gulp/watch.js',
        ]);
      });

      it('contains correct gulp tasks', function() {
        assert.fileContent([
          ['gulp/compile.js', 'gulp.task(\'jade\''],
          ['gulp/compile.js', 'gulp.task(\'nunjucks\''],
          ['gulp/compile.js', 'gulp.task(\'coffee\''],
          ['gulp/compile.js', 'gulp.task(\'ts\''],
          ['gulp/compile.js', 'gulp.task(\'less\''],
          ['gulp/compile.js', 'gulp.task(\'sass\''],
        ]);
      });

      it('contains correct package.json dependencies', function() {
        assert.fileContent([
          ['package.json', 'gulp-jade'],
          ['package.json', 'gulp-nunjucks-render'],
          ['package.json', 'gulp-coffee'],
          ['package.json', 'gulp-typescript'],
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
          ts: false,
          framework: 'none',
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
          'README.md',
          'gulp/clean.js',
          'gulp/compile.js',
          'gulp/compress.js',
          'gulp/helpers.js',
          'gulp/inject.js',
          'gulp/upload.js',
          'gulp/watch.js',
        ]);
      });

      it('does not contain extra gulp tasks', function() {
        assert.noFileContent([
          ['gulp/compile.js', 'gulp.task(\'jade\''],
          ['gulp/compile.js', 'gulp.task(\'nunjucks\''],
          ['gulp/compile.js', 'gulp.task(\'coffee\''],
          ['gulp/compile.js', 'gulp.task(\'ts\''],
          ['gulp/compile.js', 'gulp.task(\'less\''],
          ['gulp/compile.js', 'gulp.task(\'sass\''],
        ]);
      });

      it('does not contain extra package.json dependencies', function() {
        assert.noFileContent([
          ['package.json', 'gulp-jade'],
          ['package.json', 'gulp-nunjucks-render'],
          ['package.json', 'gulp-coffee'],
          ['package.json', 'gulp-typescript'],
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
          framework: 'none',
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
          'README.md',
          'gulp/clean.js',
          'gulp/compile.js',
          'gulp/compress.js',
          'gulp/helpers.js',
          'gulp/inject.js',
          'gulp/upload.js',
          'gulp/watch.js',
        ]);
      });

      it('does not contain extra gulp tasks', function() {
        assert.noFileContent([
          ['gulp/compile.js', 'gulp.task(\'jade\''],
          ['gulp/compile.js', 'gulp.task(\'nunjucks\''],
          ['gulp/compile.js', 'gulp.task(\'coffee\''],
          ['gulp/compile.js', 'gulp.task(\'ts\''],
          ['gulp/compile.js', 'gulp.task(\'less\''],
          ['gulp/compile.js', 'gulp.task(\'sass\''],
        ]);
      });

      it('does not contain extra package.json dependencies', function() {
        assert.noFileContent([
          ['package.json', 'gulp-jade'],
          ['package.json', 'gulp-nunjucks-render'],
          ['package.json', 'gulp-coffee'],
          ['package.json', 'gulp-typescript'],
          ['package.json', 'gulp-less'],
          ['package.json', 'gulp-sass'],
        ]);
      });
    });
  });

  describe('front end frameworks', function() {
    describe('passing options', function() {
      before(function(done) {
        this.options = {
          jade: false,
          nunjucks: false,
          sass: false,
          less: false,
          coffee: false,
          ts: false,
          framework: 'bs3',
        };
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions(this.options)
          .on('end', done);
      });

      it('should contain bootstrap framework', function() {
        assert.fileContent('bower.json', '"bootstrap": "~3.3.5",');
      });
    });

    describe('passing option framework:"none"', function() {
      before(function(done) {
        this.options = {
          jade: false,
          nunjucks: false,
          sass: false,
          less: false,
          coffee: false,
          ts: false,
          framework: 'none',
        };
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions(this.options)
          .on('end', done);
      });

      it('should not contain bootstrap framework', function() {
        assert.noFileContent('bower.json', '"bootstrap": "~3.3.5",');
      });
    });

    describe('passing prompts', function() {
      before(function(done) {
        this.prompts = {
          markups: [],
          styles: [],
          scripts: [],
          framework: 'bs3',
        };
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts(this.prompts)
          .on('end', done);
      });

      it('should contain bootstrap framework', function() {
        assert.fileContent('bower.json', '"bootstrap": "~3.3.5",');
      });
    });

    describe('passing prompt framework:"none"', function() {
      before(function(done) {
        this.prompts = {
          markups: [],
          styles: [],
          scripts: [],
          framework: 'none',
        };
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts(this.prompts)
          .on('end', done);
      });

      it('should not contain bootstrap framework', function() {
        assert.noFileContent('bower.json', '"bootstrap": "~3.3.5",');
      });
    });
  });
});
