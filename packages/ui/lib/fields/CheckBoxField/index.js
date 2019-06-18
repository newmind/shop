import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/fields/CheckBoxField/index.mjs";
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import CheckBox from '../../symbols/CheckBox';

var InputField = function InputField(_ref) {
  var input = _ref.input,
      label = _ref.label,
      mode = _ref.mode,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error;
  return React.createElement(CheckBox, Object.assign({
    label: label
  }, input, {
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
          label = _this$props.label;
      return React.createElement(Field, {
        name: name,
        label: label,
        component: InputField,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
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
  disabled: types.bool
};
export default Component;