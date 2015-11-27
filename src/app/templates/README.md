# Aphelion Website
> Built by [The Aphelion Generator](https://npmjs.org/package/generator-aphelion)

## Usage
- `npm run compile` compile website into temporary folder.
- `npm run serve` serve and watch a compiled, uncompressed version of website.
- `npm run serve:nowatch` serve a compiled, uncompressed version of website.
- `npm run serve:build` serve a compiled, compressed version of website.
- `npm run build` compile and compress website into a distribution folder.
- `npm run deploy` deploy a compiled, compressed version of website to GitHub Pages.
- `npm run deploy:nobuild` deploy a compiled, uncompressed version of website to GitHub Pages.

## Configuration
Main configuration is kept in a file called config.json. This file should contain the following properties:
- `paths`
  - `src` Type `string` Required: Specifies the source directory of the website code.
  - `tmp` Type `string` Required: The temporary directory for serving the compiled website.
  - `dist` Type `string` Required: Distribution directory for compiled and compressed code.

- `sourcemaps` Type `boolean|regex|function` Required: Add sourcemaps. (see: [gulp-if](https://www.npmjs.com/package/gulp-if))
- `cname` Type `string` Optional: Add `CNAME` file when deploying with this url.

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
```<% if (jade || nunjucks) { %>

## Partials
Partial files may be inserted into `.jade` and `.nunjucks` files that render with given data.<% if (jade) { %>

Jade:
```jade
body
  != partial('_views/header.jade', {title: 'Page Title'})
  p Some content
  != partial('_views/footer.jade', {title: 'Page Title'})
```<% } %><% if (nunjucks) { %>

Nunjucks:
```nunjucks
<body>
  {{ partial('_views/header.jade', {title: 'Page Title'}) }}
  <p>Some content</p>
  {{ partial('_views/footer.jade', {title: 'Page Title'}) }}
</body>
```<% } %><% } %>

## Markdown Posts
Posts may be written in markdown and extended from other templating engines. This is done like so:<% if (jade) { %>

example.md
```md
---
title: Hello World
layout: _layout.jade
---

Some example content!
```

_layout.jade
```jade
doctype html
html
  head
   title= title
  body
    != contents
```<% } %><% if (!jade && nunjucks) { %>

example.md
```md
---
title: Hello World
layout: _layout.nunjucks
---

Some example content!
```

_layout.jade
```nunjucks
<html>
  <head>
    <title>{{ title }}</title>
  </head>
  <body>
    {{ contents }}
  </body>
</html>
```<% } %>

Result:
```
<!DOCTYPE html>
<html>
  <head>
    <title>Hello World</title>
  </head>
  <body>
    <p>Some example content!</p>
  </body>
</html>
```<% } %>
