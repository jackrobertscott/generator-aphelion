const path = require('path');
const Base = require('yeoman-generator').Base;
const glob = require('glob');

module.exports = class GeneratorBase extends Base {
  constructor() {
    super(...arguments);
  }

  _copyFile(src, dest) {
    this.fs.copy(
      this.templatePath(src),
      this.destinationPath(dest)
    );
  }

  _templateFile(src, dest, data) {
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      data
    );
  }

  _copyDirectory(src, dest) {
    const files = this._prepareFiles(src, dest);

    files.forEach((file) => {
      this.fs.copy(file.src, file.dest);
    });
  }

  _templateDirectory(src, dest, data) {
    const files = this._prepareFiles(src, dest);

    files.forEach((file) => {
      this.fs.copyTpl(file.src, file.dest, data);
    });
  }

  _prepareFiles(src, dest) {
    const files = [];

    src = path.join(this.templatePath(src), '**/*');
    dest = this.destinationPath(dest);

    glob(src, (err, paths) => {
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
    });

    return files;
  }
};
