const yosay = require('yosay');
const _ = require('lodash');
const Base = require('../base');
const options = require('./options');

module.exports = class Generator extends Base {
  constructor() {
    super(...arguments);

    this.option('skip-message', {
      desc: 'Skips the welcome message',
      type: Boolean,
    });

    this.option('skip-page', {
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

    if (!this.options['skip-message']) {
      this.log(yosay('Allo! Let\'s Make A Website!'));
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
    this.data.scss = this.data.sass;
    this.config.set(this.data);
  }

  get writing() {
    return {
      app() {
        this._copyFile('_.gitignore', '.gitignore');
        this._copyFile('_bower.json', 'bower.json');
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
