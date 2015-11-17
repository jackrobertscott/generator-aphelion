'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('aphelion:app', function() {
  describe('with all features', function() {

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

      it('creates files', function() {
        assert.file([
          ''
        ]);
      });
    });

    describe('passing prompts', function() {
      before(function(done) {
        this.prompts = {
          jade: true,
          nunjucks: true,
          sass: true,
          less: true,
          coffee: true,
          es6: true,
        };
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts(this.prompts)
          .on('end', done);
      });
    });

  });
});
