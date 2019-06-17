import _defineProperty from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/symbols/Input/index.js";
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

  function Component(props) {
    var _this;

    _classCallCheck(this, Component);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this, props));
    _this.messageRef = React.createRef();
    _this.containerRef = React.createRef();
    _this._scrollEvent = _this._scrollEvent.bind(_assertThisInitialized(_this));
    _this._resizeEvent = _this._resizeEvent.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Component, [{
    key: "_scrollEvent",
    value: function _scrollEvent() {
      this._calculateTooltipPosition();
    }
  }, {
    key: "_resizeEvent",
    value: function _resizeEvent() {
      this._calculateTooltipPosition();
    }
  }, {
    key: "_calculateTooltipPosition",
    value: function _calculateTooltipPosition() {
      var message = this.props.message;
      var containerElement = this.containerRef.current;
      var messageElement = this.messageRef.current;

      if (message) {
        var containerRect = containerElement.getBoundingClientRect();
        var messageRect = messageElement.getBoundingClientRect();
        messageElement.style['top'] = containerRect['top'] - (messageRect['height'] - containerRect['height']) / 2 + 2 + 'px';
        messageElement.style['left'] = containerRect['right'] + 8 + 'px';
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('scroll', this._resizeEvent);
      window.addEventListener('resize', this._scrollEvent);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      this._calculateTooltipPosition();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('scroll', this._resizeEvent);
      window.removeEventListener('resize', this._scrollEvent);
    }
  }, {
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
          lineNumber: 100
        },
        __self: this
      }, label && React.createElement("p", {
        className: styles['label'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        },
        __self: this
      }, label), React.createElement("div", {
        ref: this.containerRef,
        className: styles['container'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      }, React.createElement("input", Object.assign({
        className: styles['input'],
        disabled: disabled
      }, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      })), !disabled && message && React.createElement("span", {
        ref: this.messageRef,
        className: styles['tooltip'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        },
        __self: this
      }, React.createElement("span", {
        className: styles['tooltip__message'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        },
        __self: this
      }, message))));
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