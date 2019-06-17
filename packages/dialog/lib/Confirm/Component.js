import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/dialog/src/Confirm/Component.js";
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Button } from "@packages/ui";
import Dialog from '../Dialog';
import styles from './defaults.module.scss';

var Component =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Component, _PureComponent);

  function Component() {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, _getPrototypeOf(Component).apply(this, arguments));
  }

  _createClass(Component, [{
    key: "_handleConfirm",
    value: function _handleConfirm() {
      var onConfirm = this.props.onConfirm;
      onConfirm && onConfirm();
    }
  }, {
    key: "_handleCancel",
    value: function _handleCancel() {
      var onCancel = this.props.onCancel;
      onCancel && onCancel();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          name = _this$props.name,
          title = _this$props.title,
          message = _this$props.message;
      return React.createElement(Dialog, {
        name: name,
        title: title,
        mode: "danger",
        onClose: this._handleCancel.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }, React.createElement("div", {
        className: styles['confirm'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      }, React.createElement("p", {
        className: styles['confirm__message'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        },
        __self: this
      }, message), React.createElement("div", {
        className: styles['confirm__controls'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        },
        __self: this
      }, React.createElement(Button, {
        mode: "danger",
        onClick: this._handleConfirm.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      }, "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u044E"), React.createElement(Button, {
        onClick: this._handleCancel.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        },
        __self: this
      }, "\u041E\u0442\u043C\u0435\u043D\u0430"))));
    }
  }]);

  return Component;
}(PureComponent);

Component.propTypes = {
  name: types.string,
  title: types.string,
  message: types.string,
  onConfirm: types.func,
  onCancel: types.func
};
Component.defaultProps = {
  name: '',
  title: 'Подтвердите действие',
  message: 'Вы уверены что хотите совершить действие?'
};
export default Component;