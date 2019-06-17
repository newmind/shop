import _defineProperty from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/dialog/src/Dialog/Component.js";
import types from 'prop-types';
import React, { PureComponent } from 'react';
import cn from 'classnames';
import styles from './defaults.module.scss';
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
    key: "_handleCloseDialog",
    value: function _handleCloseDialog() {
      var _this$props = this.props,
          name = _this$props.name,
          closeDialog = _this$props.closeDialog,
          onClose = _this$props.onClose;
      closeDialog(name);
      onClose && onClose(name);
    }
  }, {
    key: "render",
    value: function render() {
      var _cn;

      var _this$props2 = this.props,
          isOpen = _this$props2.isOpen,
          name = _this$props2.name,
          title = _this$props2.title,
          mode = _this$props2.mode,
          actionDialogName = _this$props2.actionDialogName,
          children = _this$props2.children;
      var classNameCloseDialog = cn('fas fa-times', styles['dialog__close']);
      var classNameDialog = cn(styles['dialog'], (_cn = {}, _defineProperty(_cn, styles['dialog--primary'], mode === PRIMARY_MODE), _defineProperty(_cn, styles['dialog--success'], mode === SUCCESS_MODE), _defineProperty(_cn, styles['dialog--info'], mode === INFO_MODE), _defineProperty(_cn, styles['dialog--danger'], mode === DANGER_MODE), _defineProperty(_cn, styles['dialog--warning'], mode === WARNING_MODE), _cn));
      return isOpen && name === actionDialogName && React.createElement("div", {
        className: styles['wrapper'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        },
        __self: this
      }, React.createElement("div", {
        className: classNameDialog,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        },
        __self: this
      }, React.createElement("span", {
        className: classNameCloseDialog,
        onClick: this._handleCloseDialog.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: this
      }), title && React.createElement("div", {
        className: styles['dialog__header'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }, React.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, title)), React.createElement("div", {
        className: styles['dialog__content'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        },
        __self: this
      }, children)));
    }
  }]);

  return Component;
}(PureComponent);

Component.propTypes = {
  isOpen: types.bool,
  title: types.string,
  name: types.string,
  mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
  actionDialogName: types.string,
  closeDialog: types.func,
  onClose: types.func
};
Component.defaultProps = {
  isOpen: false,
  title: null,
  name: null,
  mode: 'default'
};
export default Component;