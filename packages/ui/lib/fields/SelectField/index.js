import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/fields/SelectField/index.js";
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import Select from '../../symbols/Select';

var InputField = function InputField(_ref) {
  var input = _ref.input,
      label = _ref.label,
      options = _ref.options,
      simple = _ref.simple,
      optionKey = _ref.optionKey,
      optionValue = _ref.optionValue,
      mode = _ref.mode,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error;
  return React.createElement(Select, Object.assign({
    label: label,
    options: options,
    simple: simple,
    optionKey: optionKey,
    optionValue: optionValue
  }, input, {
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
          options = _this$props.options,
          simple = _this$props.simple,
          optionKey = _this$props.optionKey,
          optionValue = _this$props.optionValue;
      return React.createElement(Field, {
        name: name,
        options: options,
        simple: simple,
        label: label,
        optionKey: optionKey,
        optionValue: optionValue,
        component: InputField,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
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
  options: types.array,
  disabled: types.bool,
  simple: types.bool,
  optionKey: types.string,
  optionValue: types.string
};
export default Component;