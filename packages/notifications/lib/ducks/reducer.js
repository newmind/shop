import _toConsumableArray from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _objectSpread from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread";
import { PUSH_NOTIFICATION, CLOSE_NOTIFICATION } from './types';
var initialState = {
  notifications: []
};
export var KEY = 'notifications';
export default (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case CLOSE_NOTIFICATION:
      {
        var index = state['notifications'].findIndex(function (item) {
          return item['index'] === payload;
        });
        return _objectSpread({}, state, {
          notifications: [].concat(_toConsumableArray(state['notifications'].slice(0, index)), _toConsumableArray(state['notifications'].slice(index + 1)))
        });
      }

    case PUSH_NOTIFICATION:
      return _objectSpread({}, state, {
        notifications: [].concat(_toConsumableArray(state['notifications']), [payload])
      });

    default:
      return _objectSpread({}, state);
  }
});