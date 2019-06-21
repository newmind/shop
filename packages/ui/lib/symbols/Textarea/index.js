import _defineProperty from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/symbols/Textarea/index.js";
import types from 'prop-types';
import React, { PureComponent } from 'react';
import cn from 'classnames';
import styles from './default.module.scss';
var PRIMARY_MODE = 'primary';
var INFO_MODE = 'info';
var WARNING_MODE = 'warning';
var DANGER_MODE = 'danger';
var SUCCESS_MODE = 'success';

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
      var _cn;

      var _this$props = this.props,
          className = _this$props.className,
          disabled = _this$props.disabled,
          mode = _this$props.mode,
          label = _this$props.label,
          message = _this$props.message,
          props = _objectWithoutProperties(_this$props, ["className", "disabled", "mode", "label", "message"]);

      var classNameInputWrapper = cn(className, styles['wrapper'], (_cn = {}, _defineProperty(_cn, styles['wrapper--primary'], mode === PRIMARY_MODE), _defineProperty(_cn, styles['wrapper--success'], mode === SUCCESS_MODE), _defineProperty(_cn, styles['wrapper--info'], mode === INFO_MODE), _defineProperty(_cn, styles['wrapper--danger'], mode === DANGER_MODE), _defineProperty(_cn, styles['wrapper--warning'], mode === WARNING_MODE), _defineProperty(_cn, styles['wrapper--disabled'], disabled), _defineProperty(_cn, styles['wrapper--with-label'], !!label), _cn));
      return React.createElement("div", {
        className: classNameInputWrapper,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        },
        __self: this
      }, React.createElement("div", {
        className: styles['container'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        },
        __self: this
      }, label && React.createElement("p", {
        className: styles['label'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: this
      }, label), React.createElement("textarea", Object.assign({
        className: styles['textarea'],
        disabled: disabled
      }, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }))), !disabled && message && React.createElement("div", {
        className: styles['controls'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        },
        __self: this
      }, React.createElement("span", {
        className: cn(styles['info__icon'], 'fas fa-exclamation-circle'),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: this
      })));
    }
  }]);

  return Component;
}(PureComponent);

Component.propTypes = {
  className: types.string,
  label: types.string,
  type: types.oneOf(['text', 'password']),
  mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
  value: types.string,
  disabled: types.bool,
  message: types.string,
  onChange: types.func,
  onInput: types.func
};
Component.defaultProps = {
  className: '',
  type: 'text',
  mode: 'default',
  label: null,
  message: null,
  value: '',
  disabled: false
};
export default Component;