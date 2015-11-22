"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _natronCore = require("natron-core");

Object.defineProperty(exports, "task", {
  enumerable: true,
  get: function get() {
    return _natronCore.task;
  }
});
Object.defineProperty(exports, "promisify", {
  enumerable: true,
  get: function get() {
    return _natronCore.promisify;
  }
});
Object.defineProperty(exports, "defer", {
  enumerable: true,
  get: function get() {
    return _natronCore.defer;
  }
});
Object.defineProperty(exports, "Task", {
  enumerable: true,
  get: function get() {
    return _natronCore.Task;
  }
});
Object.defineProperty(exports, "TaskContext", {
  enumerable: true,
  get: function get() {
    return _natronCore.TaskContext;
  }
});

var _natronVinyl = require("natron-vinyl");

Object.defineProperty(exports, "merge", {
  enumerable: true,
  get: function get() {
    return _natronVinyl.merge;
  }
});
Object.defineProperty(exports, "awaitAll", {
  enumerable: true,
  get: function get() {
    return _natronVinyl.awaitAll;
  }
});
Object.defineProperty(exports, "fromPromise", {
  enumerable: true,
  get: function get() {
    return _natronVinyl.fromPromise;
  }
});
Object.defineProperty(exports, "transformer", {
  enumerable: true,
  get: function get() {
    return _natronVinyl.transformer;
  }
});
Object.defineProperty(exports, "Transformer", {
  enumerable: true,
  get: function get() {
    return _natronVinyl.Transformer;
  }
});

var _gulp = require("./gulp");

Object.defineProperty(exports, "gulpTask", {
  enumerable: true,
  get: function get() {
    return _gulp.gulpTask;
  }
});
Object.defineProperty(exports, "gulpContext", {
  enumerable: true,
  get: function get() {
    return _gulp.gulpContext;
  }
});