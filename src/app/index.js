import Base from '../base';
import yosay from 'yosay';
import _ from 'lodash';

export default class Generator extends Base {
  constructor() {
    super(arguments);

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

    this.option('skip-install', {
      desc: 'Skips the installation of dependencies',
      type: Boolean
    });

    this.option('skip-install-message', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean
    });
  }

  initializing() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
  }

  prompting() {
    let done = this.async();

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Allo! Allo! This is the aphelion website generator.'));
    }

    let prompts = [{
      type: 'confirm',
      name: 'jade',
      message: 'Include jade:',
      default: true,
    }, {
      type: 'confirm',
      name: 'sass',
      message: 'Include sass/scss:',
      default: true,
    }, {
      type: 'confirm',
      name: 'less',
      message: 'Include less:',
      default: true,
    }];

    this.prompt(prompts, (answers) => {
      this.data = _.assign({
        jade: false,
        sass: false,
        less: false,
      }, answers);

      done();
    });
  }

  writing() {
    this._templateFile('templates/gulpfile.js', 'gulpfile.js', this.data);
    this._templateDirectory('templates/gulp/common', 'gulp', this.data);
    if (this.data.jade) {
      this._templateFile('templates/gulp/jade.js', 'gulp/jade.js', this.data);
    }
    if (this.data.sass) {
      this._templateFile('templates/gulp/sass.js', 'gulp/sass.js', this.data);
    }
    if (this.data.less) {
      this._templateFile('templates/gulp/less.js', 'gulp/less.js', this.data);
    }
  }

  install() {
    if (!this.options['skip-install']) {
      this.installDependencies({
        skipMessage: this.options['skip-install-message'],
      });
    }
  }
}
