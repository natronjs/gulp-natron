"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * @module gulp-natron
                                                                                                                                                                                                                                                                   */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runAsGulpTask = runAsGulpTask;
exports.createContext = createContext;

var _events = require("events");

var _natronCore = require("natron-core");

var _gulpUtil = require("gulp-util");

var _prettyHrtime = require("pretty-hrtime");

var _prettyHrtime2 = _interopRequireDefault(_prettyHrtime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hrtimeMap = new WeakMap();

var anonymous = {
  __map__: new WeakMap(),
  getName: function getName(e, o) {
    var prototype = Object.getPrototypeOf(e.task);
    var className = prototype.constructor.name;
    var i = this.__map__.get(e);
    if (i === undefined) {
      i = o.c++;
      this.__map__.set(e, i);
    }
    return "<" + className + "_" + i + ">";
  }
};

function runAsGulpTask(thing) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return (0, _natronCore.task)(thing).runWithContext(createContext({ args: args }));
}

function createContext(init) {
  var eventAggregator = new _events.EventEmitter();
  var context = _extends({ eventAggregator: eventAggregator }, init);
  var o = { c: 0 };

  eventAggregator.on("start", function (e) {
    var task = e.task;
    var context = e.context;

    if (context.stack.length === 1) {
      return;
    }
    var name = ":" + task.name;
    if (!name) {
      name = anonymous.getName(e, o);
    }
    (0, _gulpUtil.log)("Starting '" + _gulpUtil.colors.cyan(name) + "'...");
    hrtimeMap.set(e, process.hrtime());
  });

  eventAggregator.on("finish", function (e) {
    var task = e.task;
    var context = e.context;

    if (context.stack.length === 1) {
      return;
    }
    var time = hrtimeMap.get(e);
    var diff = (0, _prettyHrtime2.default)(time && process.hrtime(time));
    var name = ":" + task.name;
    if (!name) {
      name = anonymous.getName(e, o);
    }
    (0, _gulpUtil.log)("Finished '" + _gulpUtil.colors.cyan(name) + "' after " + _gulpUtil.colors.magenta(diff));
  });

  return _natronCore.TaskContext.create(context);
}