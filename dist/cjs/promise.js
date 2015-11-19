"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defer = defer;
/**
 * @module gulp-natron
 */

function defer() {
  var d = undefined,
      promise = new Promise(function (resolve, reject) {
    d = { resolve: resolve, reject: reject };
  });
  d.promise = promise;
  return d;
}