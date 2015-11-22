# [![Natron][natron-img]][natron-url]

[natron-img]: http://static.natronjs.com/img/natronjs.svg
[natron-url]: http://natronjs.com/

**Use Natron in your Gulpfile**

[![Version][npm-img]][npm-url]
[![Downloads][dlm-img]][npm-url]
[![Readme][readme-img]][readme-url]

[![Gitter Chat][gitter-img]][gitter-url]

[npm-img]: https://img.shields.io/npm/v/gulp-natron.svg
[npm-url]: https://npmjs.org/package/gulp-natron
[dlm-img]: https://img.shields.io/npm/dm/gulp-natron.svg
[readme-img]: https://img.shields.io/badge/read-me-orange.svg
[readme-url]: https://natron.readme.io/docs/module-gulp-natron

[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/natronjs/natron

This module is part of [Natron][natron-url] and contains several utilities for using `Natron` in your `Gulpfile`.

## Documentation

See the [documentation for gulp-natron][readme-url].

## Usage

```js
import gulp from "gulp";
import {gulpTask, defer} from "gulp-natron";

function greet(name) {
  let d = defer();
  console.log(`Hello ${name}.`);
  setTimeout(() => {
    d.resolve("Thanks for waiting. Goodbye.");
  }, 1000);
  return d.promise;
}

function message(msg) {
  console.log(msg);
}

let greetTask = gulpTask([greet, message], {
  options: {pipe: true},
});

gulp.task("greet", () => {
  return greetTask("World");
});
```
