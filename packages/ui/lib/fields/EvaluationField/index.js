import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/fields/EvaluationField/index.js";
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import Evaluation from '../../symbols/Evaluation';

var EvaluationField = function EvaluationField(_ref) {
  var input = _ref.input,
      type = _ref.type,
      mode = _ref.mode,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error;
  return React.createElement(Evaluation, Object.assign({
    type: type,
    message: touched && error || '',
    mode: touched && error && 'danger' || mode
  }, input, {
    value: input['value'] || 0,
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
          mode = _this$props.mode,
          disabled = _this$props.disabled;
      return React.createElement(Field, {
        name: name,
        mode: mode,
        label: label,
        disabled: disabled,
        component: EvaluationField,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
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
  disabled: types.bool
};
Component.defaultProps = {
  name: '',
  mode: 'default',
  disabled: false
};
export default Component;