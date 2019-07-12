'use strict';

import 'moment/locale/ru';


export default (value) => ({
  _steps: [],
  require() {
    this._steps.push(() => (value === ''));
    return this;
  },
  isNull() {
    this._steps.push(() => (value === null));
    return this;
  },
  isNumber() {
    value && this._steps.push(() => value.constructor !== Number);
    return this;
  },
  min(num) {
    this._steps.push(() => (Number(value) < num));
    return this;
  },
  max(num) {
    this._steps.push(() => (value > num));
    return this;
  },
  check() {
    return this._steps.some(func => func() === true );
  }
});
