# [![Natron][natron-img]][natron-url]

[natron-img]: http://static.natronjs.com/img/natronjs.svg
[natron-url]: http://natronjs.com/

**Gulp with Natron**

[![Version][npm-img]][npm-url]
[![Downloads][dlm-img]][npm-url]
[![Readme][readme-img]][readme-url]

[![Gitter Chat][gitter-img]][gitter-url]

[npm-img]: https://img.shields.io/npm/v/gulp-natron.svg
[npm-url]: https://npmjs.org/package/gulp-natron
[dlm-img]: https://img.shields.io/npm/dm/gulp-natron.svg
[readme-img]: https://img.shields.io/badge/read-me-orange.svg
[readme-url]: https://natron.readme.io/

[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/natronjs/natron

This module is part of [Natron][natron-url].

## Usage

```js
var gulp = require("gulp");
var natron = require("gulp-natron");

function greet(name, time) {
  console.log("Hello " + name + ".");
  if (!time) {
    return "Goodbye.";
  }
  var d = natron.defer();
  setTimeout(function () {
    d.resolve("Thanks for waiting. Goodbye.");
  }, time);
  return d.promise;
}

function message(msg) {
  console.log(msg);
}

var greetTask = [greet, message];
greetTask.meta = {
  options: {pipe: true}
};

gulp.task("greet", function () {
  return natron.runAsGulpTask(greetTask, "World");
});

gulp.task("greet-delay", function () {
  return natron.runAsGulpTask(greetTask, "World", 1000);
});
```

```
$ gulp greet-delay
[14:23:02] Using gulpfile ~/gulpfile.js
[14:23:02] Starting 'greet-delay'...
[14:23:02] Starting ':greet'...
Hello World.
[14:23:03] Finished ':greet' after 1 s
[14:23:03] Starting ':message'...
Thanks for waiting. Goodbye.
[14:23:03] Finished ':message' after 578 μs
[14:23:03] Finished 'greet-delay' after 1.02 s
```
