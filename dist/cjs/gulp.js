"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * @module gulp-natron
                                                                                                                                                                                                                                                                   */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gulpTask = gulpTask;
exports.gulpContext = gulpContext;

var _events = require("events");

var _natronCore = require("natron-core");

var _gulpUtil = require("gulp-util");

var _prettyHrtime = require("pretty-hrtime");

var _prettyHrtime2 = _interopRequireDefault(_prettyHrtime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HRTimer = {
  __map__: new WeakMap(),
  time: function time(e) {
    this.__map__.set(e, process.hrtime());
  },
  prettyDiff: function prettyDiff(e) {
    var time = this.__map__.get(e);
    return (0, _prettyHrtime2.default)(time && process.hrtime(time));
  }
};

var NameHelper = {
  __map__: new WeakMap(),
  getName: function getName(e) {
    if (e.task.name) {
      return ":" + e.task.name;
    }
    return this.getAnonymousName(e);
  },
  getAnonymousName: function getAnonymousName(e) {
    var prototype = Object.getPrototypeOf(e.task);
    var className = prototype.constructor.name;
    var i = this.__map__.get(e);
    if (i === undefined) {
      i = e.context.gulpMeta.ac++;
      this.__map__.set(e, i);
    }
    return "<" + className + "_" + i + ">";
  }
};

var eventAggregator = new _events.EventEmitter();

eventAggregator.on("start", function (e) {
  var name = NameHelper.getName(e);
  (0, _gulpUtil.log)("Starting '" + _gulpUtil.colors.cyan(name) + "'...");
  HRTimer.time(e);
});

eventAggregator.on("finish", function (e) {
  var diff = HRTimer.prettyDiff(e);
  var name = NameHelper.getName(e);
  (0, _gulpUtil.log)("Finished '" + _gulpUtil.colors.cyan(name) + "' after " + _gulpUtil.colors.magenta(diff));
});

eventAggregator.on("error", function (e) {
  var diff = HRTimer.prettyDiff(e);
  var name = NameHelper.getName(e);
  (0, _gulpUtil.log)("'" + _gulpUtil.colors.cyan(name) + "' " + _gulpUtil.colors.red("errored after") + " " + _gulpUtil.colors.magenta(diff));
});

function gulpTask(thing, meta) {
  var task_ = (0, _natronCore.task)(thing, meta);
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return task_.runWithContext(gulpContext({ args: args }));
  };
}

function gulpContext(init) {
  return _natronCore.TaskContext.create(_extends({
    eventAggregator: eventAggregator,
    gulpMeta: { ac: 0 }
  }, init));
}