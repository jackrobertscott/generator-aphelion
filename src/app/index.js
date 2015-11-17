const yosay = require('yosay');
const _ = require('lodash');
const Base = require('../base');
const options = require('./options');

module.exports = class Generator extends Base {
  constructor() {
    super(...arguments);

    this.option('no-message', {
      desc: 'Skips the welcome message',
      type: Boolean,
    });

    this.option('no-install', {
      desc: 'Skips the installation of dependencies',
      type: Boolean,
    });

    this.option('no-install-message', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean,
    });

    this.option('no-page', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean,
    });

    options.forEach((option) => {
      this.option(option.name, {
        desc: 'Install ' + option.pretty,
        type: Boolean,
      });
    });
  }

  prompting() {
    let done = this.async();

    if (!this.options['no-message']) {
      this.log(yosay('Allo! Allo! This is the aphelion website generator.'));
    }

    const prompts = _.uniq(options, (option) => {
        return option.type;
      })
      .map(({
        type
      }) => {
        let choices = options.filter((option) => {
            return option.type === type && !this.options[option.name];
          })
          .map((option) => {
            return {
              name: option.pretty,
              value: option.name,
            };
          });

        return {
          type: 'checkbox',
          name: type,
          message: 'Include extra ' + type + ' compilers:',
          choices: choices,
          when: !!choices.length,
        };
      });

    this.prompt(prompts, (answers) => {
      this.data = {};

      options.forEach((option) => {
        this.data[option.name] = (answers[option.type] &&
            answers[option.type].indexOf(option.name) !== -1) ||
          !!this.options[option.name] || false; // shouldn't reach false
      });

      done();
    });
  }

  configuring() {
    this.config.set(this.data);
  }

  writing() {
    this._copyFile('config.json', 'config.json');
    this._templateFile('_package.json', 'package.json', this.data);
    this._templateFile('gulpfile.js', 'gulpfile.js', this.data);
    this._templateDirectory('gulp', 'gulp', this.data);

    if (!this.options['no-page']) {
      this.composeWith('aphelion:page', {
        options: {
          'no-message': true,
          markups: (this.data.jade) ? 'jade' : (this.data.nunjucks) ? 'nunjucks' : 'html',
          styles: (this.data.less) ? 'less' : (this.data.sass) ? 'scss' : 'css',
        }
      }, {
        local: require.resolve('../page'),
      });
    }
  }

  install() {
    if (!this.options['no-install']) {
      this.installDependencies({
        skipMessage: this.options['no-install-message'],
      });
    }
  }
};
