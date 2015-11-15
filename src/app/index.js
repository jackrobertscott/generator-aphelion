import yosay from 'yosay';
import _ from 'lodash';
import Base from '../base';
import prompts from './prompts';

export default class Generator extends Base {
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
  }

  initializing() {
    prompts.forEach((prompt) => {
      prompt.choices.forEach((choice) => {
        this.option(choice.value, {
          desc: prompt.message + ' ' + choice.value,
          type: Boolean,
          default: false,
        });
      });
    });
  }

  prompting() {
    let done = this.async();

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Allo! Allo! This is the aphelion website generator.'));
    }

    this.prompt(prompts, (answers) => {
      this.data = _.assign(this.options, answers);
      done();
    });
  }

  get writing() {
    return {
      writeGulp() {
        this._templateFile('templates/gulpfile.js', 'gulpfile.js', this.data);
        this._templateDirectory('templates/gulp/common', 'gulp', this.data);

        // markups
        if (this.data.html) this._copyFile('templates/gulp/compilers/html.js', 'gulp/compilers/html.js');
        if (this.data.jade) this._copyFile('templates/gulp/compilers/jade.js', 'gulp/compilers/jade.js');
        if (this.data.nunjucks) this._copyFile('templates/gulp/compilers/nunjucks.js', 'gulp/compilers/nunjucks.js');

        // styles
        if (this.data.sass) this._copyFile('templates/gulp/compilers/sass.js', 'gulp/compilers/sass.js');
        if (this.data.less) this._copyFile('templates/gulp/compilers/less.js', 'gulp/compilers/less.js');
        if (this.data.css) this._copyFile('templates/gulp/compilers/css.js', 'gulp/compilers/css.js');

        // scripts
        if (this.data.coffee) this._copyFile('templates/gulp/compilers/coffee.js', 'gulp/compilers/coffee.js');
        if (this.data.es6) this._copyFile('templates/gulp/compilers/es6.js', 'gulp/compilers/es6.js');
        if (this.data.js) this._copyFile('templates/gulp/compilers/js.js', 'gulp/compilers/js.js');
      },

      writePkg() {
        this._templateFile('templates/_package.json', 'package.json', this.data);
      }
    };
  }

  install() {
    if (!this.options['skip-install']) {
      this.installDependencies({
        skipMessage: this.options['skip-install-message'],
      });
    }
  }
}
