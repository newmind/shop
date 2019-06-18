import _regeneratorRuntime from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator";
import _defineProperty from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
import _asyncToGenerator from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/symbols/FileInput/index.mjs";
import types from 'prop-types';
import React, { PureComponent } from 'react';
import cn from 'classnames';
import styles from './default.module.scss';
var PRIMARY_MODE = 'primary';
var INFO_MODE = 'info';
var WARNING_MODE = 'warning';
var DANGER_MODE = 'danger';
var SUCCESS_MODE = 'success';
var contentElement = document.getElementById("content"); // Button callback

function onButtonClicked() {
  return _onButtonClicked.apply(this, arguments);
} // ---- function definition ----


function _onButtonClicked() {
  _onButtonClicked = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var files;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return selectFile("image/*", true);

          case 2:
            files = _context.sent;
            contentElement.innerHTML = files.map(function (file) {
              return '<img src="${URL.createObjectURL(file)}" style="width: 100px; height: 100px;">';
            }).join('');

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _onButtonClicked.apply(this, arguments);
}

function selectFile(contentType, multiple) {
  return new Promise(function (resolve) {
    var input = document.createElement('input');
    input.type = 'file';
    input.multiple = multiple;
    input.accept = contentType;

    input.onchange = function (_) {
      var files = Array.from(input.files);
      if (multiple) resolve(files);else resolve(files[0]);
    };

    input.click();
  });
}

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
          lineNumber: 79
        },
        __self: this
      }, React.createElement("div", {
        className: styles['container'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        },
        __self: this
      }, label && React.createElement("p", {
        className: styles['label'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        },
        __self: this
      }, label), React.createElement("input", Object.assign({
        className: styles['input'],
        disabled: disabled
      }, props, {
        type: "file",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        },
        __self: this
      }))), !disabled && message && React.createElement("div", {
        className: styles['controls'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        },
        __self: this
      }, React.createElement("span", {
        className: cn(styles['info__icon'], 'fas fa-exclamation-circle'),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88
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
  value: types.any,
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