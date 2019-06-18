import _defineProperty from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/symbols/Button/index.mjs";
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
      var onClick = this.props.onClick;
      onClick && onClick();
    }
  }, {
    key: "render",
    value: function render() {
      var _cn;

      var _this$props = this.props,
          type = _this$props.type,
          className = _this$props.className,
          caption = _this$props.caption,
          children = _this$props.children,
          disabled = _this$props.disabled,
          mode = _this$props.mode;
      var classNameButton = cn(className, styles['button'], (_cn = {}, _defineProperty(_cn, styles['button--primary'], mode === PRIMARY_MODE), _defineProperty(_cn, styles['button--success'], mode === SUCCESS_MODE), _defineProperty(_cn, styles['button--info'], mode === INFO_MODE), _defineProperty(_cn, styles['button--danger'], mode === DANGER_MODE), _defineProperty(_cn, styles['button--warning'], mode === WARNING_MODE), _defineProperty(_cn, styles['button--disabled'], disabled), _cn));
      return React.createElement("button", {
        type: type,
        className: classNameButton,
        onClick: this._handleClick.bind(this),
        disabled: disabled,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        },
        __self: this
      }, caption || children);
    }
  }]);

  return Component;
}(PureComponent);

Component.propTypes = {
  className: types.string,
  type: types.oneOf(['button', 'submit']),
  mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
  caption: types.string,
  children: types.any,
  disabled: types.bool,
  onClick: types.func
};
Component.defaultProps = {
  type: 'button',
  mode: 'default',
  caption: null,
  disabled: false,
  children: 'Button'
};
export default Component;