/**
 * @module gulp-natron
 */

export function defer() {
  let d, promise = new Promise((resolve, reject) => {
    d = {resolve, reject};
  });
  d.promise = promise;
  return d;
}
