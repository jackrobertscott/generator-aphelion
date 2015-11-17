const path = require('path');
const yosay = require('yosay');
const _ = require('lodash');
const Base = require('../base');

module.exports = class Generator extends Base {
  constructor() {
    super(...arguments);

    this.option('no-message', {
      desc: 'Skips the welcome message',
      type: Boolean,
    });

    this.option('path', {
      desc: 'Path to location of page files',
      type: String
    });

    this.option('markups', {
      desc: 'Which markup compiler to use in page',
      type: String
    });

    this.option('styles', {
      desc: 'Which style compiler to use in page',
      type: String
    });
  }

  initializing() {
    this.data = {
      path: this.options.path,
      markups: this.options.markups,
      styles: this.options.styles,
      yorc: this.config.getAll(),
      site: this.fs.readJSON(this.destinationPath('config.json'), {}),
    };
  }

  prompting() {
    let done = this.async();

    if (!this.options['no-message']) {
      this.log(yosay('Let\'s make a new page.'));
    }

    const prompts = [{
      type: 'input',
      name: 'path',
      message: 'Path to location of page files',
      default: 'example',
      when: !this.data.path,
    }, {
      type: 'checkbox',
      name: 'markups',
      message: 'Page markup type:',
      choices: [{
        name: 'html',
        value: 'HTML',
      }, {
        name: 'jade',
        value: 'Jade',
      }, {
        name: 'nunjucks',
        value: 'Nunjucks',
      }],
      when: !this.data.markups || ['html', 'jade', 'nunjucks'].indexOf(this.data.markups) === -1,
    }, {
      type: 'checkbox',
      name: 'styles',
      message: 'Page style type:',
      choices: [{
        name: 'css',
        value: 'CSS',
      }, {
        name: 'sass',
        value: 'SASS',
      }, {
        name: 'scss',
        value: 'SCSS',
      }, {
        name: 'less',
        value: 'Less',
      }],
      when: !this.data.styles || ['css', 'sass', 'scss', 'less'].indexOf(this.data.styles) === -1,
    }];

    this.prompt(prompts, (answers) => {
      _.assign(this.data, answers);

      done();
    });
  }

  writing() {
    let out = path.join(this.data.site.src || 'src', this.data.path);
    switch (this.data.markups) {
      case 'jade':
        this._copyDirectory('jade', out);
        break;
      case 'nunjucks':
        this._copyDirectory('nunjucks', out);
        break;
      default:
        this._copyDirectory('html', out);
    }
    switch (this.data.styles) {
      case 'sass':
        this._copyDirectory('sass', out);
        break;
      case 'scss':
        this._copyDirectory('scss', out);
        break;
      case 'less':
        this._copyDirectory('less', out);
        break;
      default:
        this._copyDirectory('css', out);
    }
  }
};
