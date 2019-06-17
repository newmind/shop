import _defineProperty from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/symbols/CheckBox/index.js";
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
    key: "_handleClick",
    value: function _handleClick() {
      var _this$props = this.props,
          value = _this$props.value,
          onChange = _this$props.onChange;
      onChange && onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _cn;

      var _this$props2 = this.props,
          className = _this$props2.className,
          disabled = _this$props2.disabled,
          mode = _this$props2.mode,
          value = _this$props2.value;
      var classNameButton = cn(className, styles['checkbox'], (_cn = {}, _defineProperty(_cn, styles['checkbox--primary'], mode === PRIMARY_MODE), _defineProperty(_cn, styles['checkbox--success'], mode === SUCCESS_MODE), _defineProperty(_cn, styles['checkbox--info'], mode === INFO_MODE), _defineProperty(_cn, styles['checkbox--danger'], mode === DANGER_MODE), _defineProperty(_cn, styles['checkbox--warning'], mode === WARNING_MODE), _defineProperty(_cn, styles['checkbox--disabled'], disabled), _defineProperty(_cn, styles['checkbox--checked'], value), _cn));
      return React.createElement("span", {
        className: classNameButton,
        onClick: this._handleClick.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        },
        __self: this
      }, React.createElement("span", {
        className: cn(styles['checkbox__marker'], 'fas fa-check'),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        },
        __self: this
      }));
    }
  }]);

  return Component;
}(PureComponent);

Component.propTypes = {
  className: types.string,
  mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
  disabled: types.bool,
  value: types.bool,
  onChange: types.func
};
Component.defaultProps = {
  mode: 'default',
  disabled: false,
  value: false
};
export default Component;