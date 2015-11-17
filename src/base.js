const path = require('path');
const Base = require('yeoman-generator').Base;
const glob = require('glob');

module.exports = class GeneratorBase extends Base {
  constructor() {
    super(...arguments);
  }

  _copyFile(src, dest) {
    if (!dest) {
      dest = src;
    }
    this.fs.copy(
      this.templatePath(src),
      this.destinationPath(dest)
    );
  }

  _templateFile(src, dest, data) {
    if (typeof dest !== 'string') {
      data = dest;
      dest = src;
    }
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      data
    );
  }

  _copyDirectory(src, dest) {
    if (!dest) {
      dest = src;
    }
    this._prepareFiles(src, dest, (files) => {
      files.forEach((file) => {
        this.fs.copy(file.src, file.dest);
      });
    });
  }

  _templateDirectory(src, dest, data) {
    if (typeof dest !== 'string') {
      data = dest;
      dest = src;
    }
    this._prepareFiles(src, dest, (files) => {
      files.forEach((file) => {
        this.fs.copyTpl(file.src, file.dest, data);
      });
    });
  }

  _prepareFiles(src, dest, cb) {
    const files = [];

    src = this.templatePath(src);
    dest = this.destinationPath(dest);

    glob(path.join(src, '**/*'), (err, paths) => {
      if (err) {
        throw err;
      }

      paths.forEach((srcPath) => {
        let relative = path.relative(src, srcPath);
        let dirname = path.dirname(relative);
        let basename = path.basename(relative);

        if (basename.indexOf('_') === 0) {
          basename = basename.substr(1);
        }

        let destPath = path.join(dest, dirname, basename);

        files.push({
          src: srcPath,
          dest: destPath,
        });
      });

      cb(files);
    });

    return files;
  }
};
