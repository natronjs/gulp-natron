/**
 * @module gulp-natron
 */
import {EventEmitter} from "events";
import {task, TaskContext} from "natron-core";
import {log, colors} from "gulp-util";
import prettyTime from "pretty-hrtime";

let HRTimer = {
  __map__: new WeakMap(),
  time(e) {
    this.__map__.set(e, process.hrtime());
  },
  prettyDiff(e) {
    let time = this.__map__.get(e);
    return prettyTime(time && process.hrtime(time));
  },
};

let NameHelper = {
  __map__: new WeakMap(),
  getName(e) {
    if (e.task.name) {
      return `:${e.task.name}`;
    }
    return this.getAnonymousName(e);
  },
  getAnonymousName(e) {
    let prototype = Object.getPrototypeOf(e.task);
    let className = prototype.constructor.name;
    let i = this.__map__.get(e);
    if (i === undefined) {
      i = e.context.gulpMeta.ac++;
      this.__map__.set(e, i);
    }
    return `<${className}_${i}>`;
  },
};

let eventAggregator = new EventEmitter();

eventAggregator.on("start", (e) => {
  let name = NameHelper.getName(e);
  log(`Starting '${colors.cyan(name)}'...`);
  HRTimer.time(e);
});

eventAggregator.on("finish", (e) => {
  let diff = HRTimer.prettyDiff(e);
  let name = NameHelper.getName(e);
  log(`Finished '${colors.cyan(name)}' after ${colors.magenta(diff)}`);
});

eventAggregator.on("error", (e) => {
  let diff = HRTimer.prettyDiff(e);
  let name = NameHelper.getName(e);
  log(`'${colors.cyan(name)}' ${colors.red("errored after")} ${colors.magenta(diff)}`);
});

export function gulpTask(thing, meta) {
  let task_ = task(thing, meta);
  return function (...args) {
    return task_.runWithContext(gulpContext({args}));
  };
}

export function gulpContext(init) {
  return TaskContext.create(Object.assign({
    eventAggregator,
    gulpMeta: {ac: 0},
  }, init));
}
