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
  return natron.gulpTask(greetTask)("World");
});

gulp.task("greet-delay", function () {
  return natron.gulpTask(greetTask)("World", 1000);
});
```

```
$ gulp greet-delay
[11:15:00] Using gulpfile ~/gulpfile.js
[11:15:00] Starting 'greet-delay'...
[11:15:00] Starting '<TaskSequence_0>'...
[11:15:00] Starting ':greet'...
Hello World.
[11:15:01] Finished ':greet' after 1 s
[11:15:01] Starting ':message'...
Thanks for waiting. Goodbye.
[11:15:01] Finished ':message' after 436 μs
[11:15:01] Finished '<TaskSequence_0>' after 1.01 s
[11:15:01] Finished 'greet-delay' after 1.01 s
```
