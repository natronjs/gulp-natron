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

Object.defineProperty(exports, "runAsGulpTask", {
  enumerable: true,
  get: function get() {
    return _gulp.runAsGulpTask;
  }
});
Object.defineProperty(exports, "createContext", {
  enumerable: true,
  get: function get() {
    return _gulp.createContext;
  }
});

var _promise = require("./promise");

Object.defineProperty(exports, "defer", {
  enumerable: true,
  get: function get() {
    return _promise.defer;
  }
});