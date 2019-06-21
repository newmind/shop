import _defineProperty from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/symbols/Spinner/index.js";
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
          mode = _this$props.mode;
      var classNameImageWrapper = cn(className, styles['spinner'], (_cn = {}, _defineProperty(_cn, styles['wrapper--primary'], mode === PRIMARY_MODE), _defineProperty(_cn, styles['wrapper--success'], mode === SUCCESS_MODE), _defineProperty(_cn, styles['wrapper--info'], mode === INFO_MODE), _defineProperty(_cn, styles['wrapper--danger'], mode === DANGER_MODE), _defineProperty(_cn, styles['wrapper--warning'], mode === WARNING_MODE), _cn));
      return React.createElement("div", {
        className: classNameImageWrapper,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        },
        __self: this
      }, React.createElement("div", {
        className: styles['dot1'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        },
        __self: this
      }), React.createElement("div", {
        className: styles['dot2'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        __self: this
      }));
    }
  }]);

  return Component;
}(PureComponent);

Component.propTypes = {
  className: types.string,
  mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default'])
};
Component.defaultProps = {
  className: '',
  mode: 'default'
};
export default Component;