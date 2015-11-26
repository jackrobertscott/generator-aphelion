'use strict';

const yosay = require('yosay');
const _ = require('lodash');
const Base = require('../base');
const prompts = require('./prompts');

module.exports = class Generator extends Base {
  constructor() {
    super(...arguments);

    this.data = {};

    this.option('skip-message', {
      desc: 'Skips the welcome message',
      type: Boolean,
    });

    this.option('skip-page', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean,
    });

    prompts.forEach(prompt => {
      if (prompt.type !== 'checkbox') return;
      prompt.choices.forEach(choice => {
        this.option(choice.value, {
          desc: 'Use ' + choice.name,
          type: Boolean,
        });
      });
    });

    this.option('framework', {
      desc: 'Use which front end framework',
      type: String,
    });
  }

  prompting() {
    let done = this.async();

    if (!this.options['skip-message']) {
      this.log(yosay('Allo! Let\'s Make A Website!'));
    }

    const questions = prompts.map(prompt => {
      const question = _.assign({}, prompt); // copy
      if (question.type === 'checkbox') {
        question.choices = question.choices.filter(choice => {
          return !this.options[choice.value];
        });
        question.when = !!question.choices.length;
      } else if (question.name === 'framework') {
        if (this.options.framework && ['bs3', 'bs4', 'skeleton', 'none'].indexOf(this.options.framework) !== -1) {
          question.when = false; // don't ask for if set as option
        } else {
          delete this.options.framework; // delete just incase wrong var set
        }
      }
      return question;
    });

    this.prompt(questions, (answers) => {
      prompts.forEach(prompt => {
        if (prompt.type !== 'checkbox') return;
        prompt.choices.forEach(choice => {
          this.data[choice.value] = !!this.options[choice.value] ||
            (answers[prompt.name] && answers[prompt.name].indexOf(choice.value) !== -1);
        });
      });

      this.data.framework = this.options.framework || answers.framework;

      done();
    });
  }

  configuring() {
    this.data.scss = this.data.sass;
    this.config.set(this.data);
  }

  get writing() {
    return {
      app() {
        this._copyFile('_.gitignore', '.gitignore');
        this._templateFile('_bower.json', 'bower.json', this.data);
        this._templateFile('_package.json', 'package.json', this.data);
        this._copyFile('config.json');
        this._templateFile('gulpfile.js', this.data);
        this._templateDirectory('gulp', this.data);
      },

      page() {
        if (!this.options['skip-page']) {
          this.composeWith('aphelion:page', {
            options: {
              'skip-message': true,
              path: '',
              markups: (this.data.jade) ? 'jade' : (this.data.nunjucks) ? 'nunjucks' : 'html',
              styles: (this.data.sass) ? 'scss' : (this.data.less) ? 'less' : 'css',
            }
          }, {
            local: require.resolve('../page'),
          });
        }
      }
    };
  }

  install() {
    this.installDependencies();
  }
};
