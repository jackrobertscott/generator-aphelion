const yosay = require('yosay');
const _ = require('lodash');
const Base = require('../base');
const options = require('./options');

module.exports = class Generator extends Base {
  constructor() {
    super(...arguments);

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean,
    });

    this.option('skip-install', {
      desc: 'Skips the installation of dependencies',
      type: Boolean,
    });

    this.option('skip-install-message', {
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

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Allo! Allo! This is the aphelion website generator.'));
    }

    let prompts = _.uniq(options, (option) => {
        return option.type;
      })
      .map(({type}) => {
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
          message: 'Include which ' + type + ':',
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

  writing() {
    this._templateFile('gulpfile.js', 'gulpfile.js', this.data);
    this._templateDirectory('gulp', 'gulp', this.data);
    this._templateFile('_package.json', 'package.json', this.data);
  }

  install() {
    if (!this.options['skip-install']) {
      this.installDependencies({
        skipMessage: this.options['skip-install-message'],
      });
    }
  }
};
