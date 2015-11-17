# Aphelion Website
> Built by Aphelion Generator: Generator for capable static websites

## Usage
- `gulp compile` compile website into temporary folder.
- `gulp build` compile and compress website into a distribution folder.
- `gulp serve` serve and watch a compiled, uncompressed version of website.
- `gulp serve:build` serve a compiled, compressed version of website.
- `gulp deploy` deploy a compiled, compressed version of website to GitHub Pages.
- `gulp deploy:uncompressed` deploy a compiled, uncompressed version of website to GitHub Pages.

## File Injection
Script and style files, both custom built and installed from bower, may be injected into markup files. To do this, you must include associated comment tags into any markup file you wish to have the scripts/styles included in. Bellow is an example:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Title</title>
    <!-- bower:css -->
    <!-- bower installed css files will go here... -->
    <!-- endinject -->
    <!-- inject:css -->
    <!-- css files will go here... -->
    <!-- endinject -->
  </head>
  <body>
    <!-- bower:js -->
    <!-- bower installed scripts will go here... -->
    <!-- endinject -->
    <!-- inject:js -->
    <!-- js files will go here... -->
    <!-- endinject -->
  </body>
</html>
```
