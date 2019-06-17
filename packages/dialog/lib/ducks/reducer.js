import _objectSpread from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread";
import { OPEN_DIALOG, CLOSE_DIALOG } from './types';
var initialState = {
  isOpen: false,
  name: null
};
export var KEY = 'dialog';
export default (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case OPEN_DIALOG:
      return _objectSpread({}, state, {
        isOpen: true,
        name: payload
      });

    case CLOSE_DIALOG:
      return _objectSpread({}, state, {
        isOpen: false,
        name: null
      });

    default:
      return _objectSpread({}, state);
  }
});