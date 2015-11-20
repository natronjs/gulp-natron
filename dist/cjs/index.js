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

var _promise = require("./promise");

Object.defineProperty(exports, "defer", {
  enumerable: true,
  get: function get() {
    return _promise.defer;
  }
});