import _defineProperty from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/fields/BaseField/index.js";
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import Input from '../../symbols/Input';
import cn from "classnames";
import styles from "../../symbols/Input/default.module.scss";
var PRIMARY_MODE = 'primary';
var INFO_MODE = 'info';
var WARNING_MODE = 'warning';
var DANGER_MODE = 'danger';
var SUCCESS_MODE = 'success'; // const InputField = ({ input, label, mode, type, disabled, meta: { touched, error } }) => {
// };

var FieldComponent =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(FieldComponent, _PureComponent);

  function FieldComponent(props) {
    var _this;

    _classCallCheck(this, FieldComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FieldComponent).call(this, props));
    _this.messageRef = React.createRef();
    _this.containerRef = React.createRef();
    _this._scrollEvent = _this._scrollEvent.bind(_assertThisInitialized(_this));
    _this._resizeEvent = _this._resizeEvent.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FieldComponent, [{
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
          input = _this$props.input,
          label = _this$props.label,
          mode = _this$props.mode,
          type = _this$props.type,
          disabled = _this$props.disabled,
          _this$props$meta = _this$props.meta,
          touched = _this$props$meta.touched,
          error = _this$props$meta.error;
      var classNameInputWrapper = cn(styles['wrapper'], (_cn = {}, _defineProperty(_cn, styles['wrapper--primary'], mode === PRIMARY_MODE), _defineProperty(_cn, styles['wrapper--success'], mode === SUCCESS_MODE), _defineProperty(_cn, styles['wrapper--info'], mode === INFO_MODE), _defineProperty(_cn, styles['wrapper--danger'], mode === DANGER_MODE), _defineProperty(_cn, styles['wrapper--warning'], mode === WARNING_MODE), _defineProperty(_cn, styles['wrapper--disabled'], disabled), _cn));
      return React.createElement("div", {
        className: classNameInputWrapper,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        },
        __self: this
      }, label && React.createElement("p", {
        className: styles['label'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        },
        __self: this
      }, label), React.createElement("div", {
        ref: this.containerRef,
        className: styles['container'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        },
        __self: this
      }, React.createElement(Input, Object.assign({
        type: type
      }, input, {
        mode: mode || touched && error && 'danger' || 'default',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      })), !disabled && error && React.createElement("span", {
        ref: this.messageRef,
        className: styles['tooltip'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }, React.createElement("span", {
        className: styles['tooltip__message'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }, error))));
    }
  }]);

  return FieldComponent;
}(PureComponent);

FieldComponent.propTypes = {
  className: types.string,
  label: types.string,
  mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
  value: types.any,
  disabled: types.bool,
  message: types.string,
  onChange: types.func,
  onInput: types.func
};
FieldComponent.defaultProps = {
  className: '',
  type: 'text',
  mode: 'default',
  label: null,
  message: null,
  value: '',
  disabled: false
};

var Component =
/*#__PURE__*/
function (_PureComponent2) {
  _inherits(Component, _PureComponent2);

  function Component() {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, _getPrototypeOf(Component).apply(this, arguments));
  }

  _createClass(Component, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          name = _this$props2.name,
          label = _this$props2.label,
          type = _this$props2.type;
      return React.createElement(Field, {
        name: name,
        type: type,
        label: label,
        component: FieldComponent,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 136
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
  type: types.string,
  disabled: types.bool
};
export default Component;