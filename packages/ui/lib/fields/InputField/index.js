import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/fields/InputField/index.js";
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import Input from '../../symbols/Input';

var InputField = function InputField(_ref) {
  var input = _ref.input,
      label = _ref.label,
      mode = _ref.mode,
      type = _ref.type,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error;
  return React.createElement(Input, Object.assign({
    label: label
  }, input, {
    type: type,
    message: touched && error || '',
    mode: mode || touched && error && 'danger' || 'default',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }));
};

var Component =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Component, _PureComponent);

  function Component() {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, _getPrototypeOf(Component).apply(this, arguments));
  }

  _createClass(Component, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          name = _this$props.name,
          label = _this$props.label,
          type = _this$props.type;
      return React.createElement(Field, {
        name: name,
        type: type,
        label: label,
        component: InputField,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        },
        __self: this
      });
    }
  }]);

  return Component;
}(PureComponent);

Component.propTypes = {
  name: types.string,
  mode: types.string,
  label: types.string,
  type: types.string,
  disabled: types.bool
};
export default Component;