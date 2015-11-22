/**
 * @module gulp-natron
 * test
 */
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

let {assert} = chai;
chai.use(chaiAsPromised);

Object.assign(global, {
  assert,
});
