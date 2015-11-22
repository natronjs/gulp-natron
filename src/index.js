/**
 * @module gulp-natron
 */
export {task, promisify, defer, Task, TaskContext} from "natron-core";
export {merge, awaitAll, fromPromise, transformer, Transformer} from "natron-vinyl";
export {gulpTask, gulpContext} from "./gulp";
