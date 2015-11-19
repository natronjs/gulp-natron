/**
 * @module gulp-natron
 */
import {EventEmitter} from "events";
import {task, TaskContext} from "natron-core";
import {log, colors} from "gulp-util";
import prettyTime from "pretty-hrtime";

let hrtimeMap = new WeakMap();

let anonymous = {
  __map__: new WeakMap(),
  getName(e, o) {
    let prototype = Object.getPrototypeOf(e.task);
    let className = prototype.constructor.name;
    let i = this.__map__.get(e);
    if (i === undefined) {
      i = o.c++;
      this.__map__.set(e, i);
    }
    return `<${className}_${i}>`;
  },
};

export function runAsGulpTask(thing, ...args) {
  return task(thing).runWithContext(createContext({args}));
}

export function createContext(init) {
  let eventAggregator = new EventEmitter();
  let context = Object.assign({eventAggregator}, init);
  let o = {c: 0};

  eventAggregator.on("start", (e) => {
    let {task, context} = e;
    if (context.stack.length === 1) {
      return;
    }
    let name = ":" + task.name;
    if (!name) {
      name = anonymous.getName(e, o);
    }
    log(`Starting '${colors.cyan(name)}'...`);
    hrtimeMap.set(e, process.hrtime());
  });

  eventAggregator.on("finish", (e) => {
    let {task, context} = e;
    if (context.stack.length === 1) {
      return;
    }
    let time = hrtimeMap.get(e);
    let diff = prettyTime(time && process.hrtime(time));
    let name = ":" + task.name;
    if (!name) {
      name = anonymous.getName(e, o);
    }
    log(`Finished '${colors.cyan(name)}' after ${colors.magenta(diff)}`);
  });

  return TaskContext.create(context);
}
