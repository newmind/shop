import _defineProperty from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";

var _this = this,
    _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/symbols/Select/index.js";

import types from 'prop-types';
import React, { PureComponent } from 'react';
import cn from 'classnames';
import styles from './default.module.scss';
var PRIMARY_MODE = 'primary';
var INFO_MODE = 'info';
var WARNING_MODE = 'warning';
var DANGER_MODE = 'danger';
var SUCCESS_MODE = 'success';
var Options = React.forwardRef(function (props, ref) {
  var options = props.options,
      optionValue = props.optionValue,
      onCheck = props.onCheck;

  var getValue = function getValue(value) {
    if (value instanceof Object) {
      return value[optionValue];
    } else {
      return value;
    }
  };

  return React.createElement("div", {
    ref: ref,
    className: styles['options'],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, React.createElement("div", {
    className: styles['options__content'],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, options.length ? options.map(function (option, key) {
    return React.createElement("span", {
      key: key,
      className: styles['option'],
      onClick: onCheck.bind(_this, option),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      },
      __self: this
    }, React.createElement("span", {
      className: styles['option__value'],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: this
    }, getValue(option)));
  }) : React.createElement("span", {
    className: styles['options__empty'],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }, "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445")));
});

var Component =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Component, _PureComponent);

  function Component(props) {
    var _this2;

    _classCallCheck(this, Component);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this, props));
    _this2.inputRef = React.createRef();
    _this2.selectRef = React.createRef();
    _this2.optionsRef = React.createRef();
    _this2.messageRef = React.createRef();
    _this2.state = {
      isOpen: false,
      isFocus: false,
      value: ''
    };
    _this2._eventReset = _this2._eventReset.bind(_assertThisInitialized(_this2));
    _this2._eventHandleResize = _this2._eventHandleResize.bind(_assertThisInitialized(_this2));
    _this2._eventHandleScrolling = _this2._eventHandleScrolling.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(Component, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('click', this._eventReset);
      window.addEventListener('resize', this._eventHandleResize);
      document.addEventListener('scroll', this._eventHandleScrolling);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      this._calculateTooltipPosition();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('click', this._eventReset);
      window.removeEventListener('resize', this._eventHandleResize);
      document.removeEventListener('scroll', this._eventHandleScrolling);
    }
  }, {
    key: "_calculateTooltipPosition",
    value: function _calculateTooltipPosition() {
      var message = this.props.message;
      var selectRef = this.selectRef.current;
      var messageElement = this.messageRef.current;

      if (message) {
        var selectRect = selectRef.getBoundingClientRect();
        var messageRect = messageElement.getBoundingClientRect();
        messageElement.style['top'] = selectRect['top'] - (messageRect['height'] - selectRect['height']) / 2 + 2 + 'px';
        messageElement.style['left'] = selectRect['right'] + 8 + 'px';
      }
    }
  }, {
    key: "_eventReset",
    value: function _eventReset(event) {
      var selectElement = this.selectRef.current;
      var target = event.target;

      if (selectElement && !selectElement.contains(target)) {
        this._handleOnBlur();
      }
    }
  }, {
    key: "_eventHandleScrolling",
    value: function _eventHandleScrolling() {
      this._handleOnBlur();

      this._calculateTooltipPosition();
    }
  }, {
    key: "_eventHandleResize",
    value: function _eventHandleResize() {
      this._handleOnBlur();

      this._calculateTooltipPosition();
    }
  }, {
    key: "_handleSetFocus",
    value: function _handleSetFocus() {
      var onFocus = this.props.onFocus;
      var selectRef = this.selectRef.current; // const { current: inputRef } = this.inputRef;

      var optionsRef = this.optionsRef.current;
      var selectRect = selectRef.getBoundingClientRect(); // inputRef.focus();

      optionsRef.style['top'] = selectRect['bottom'] + 'px';
      optionsRef.style['width'] = selectRect['width'] + 'px';
      onFocus();
    }
  }, {
    key: "_applyValue",
    value: function _applyValue(value) {
      var _this$props = this.props,
          optionKey = _this$props.optionKey,
          simple = _this$props.simple;

      if (value instanceof Object) {
        if (simple) {
          return value[optionKey];
        } else {
          return value;
        }
      } else {
        return value;
      }
    }
  }, {
    key: "_getValue",
    value: function _getValue(value) {
      var _this$props2 = this.props,
          simple = _this$props2.simple,
          options = _this$props2.options,
          optionKey = _this$props2.optionKey,
          optionValue = _this$props2.optionValue;

      if (simple) {
        var option = options.find(function (option) {
          return option[optionKey] === value;
        });

        if (option) {
          return option[optionValue];
        }
      } else {
        if (value instanceof Object) {
          return value[optionValue];
        } else {
          return value;
        }
      }
    }
  }, {
    key: "_handleOnFocus",
    value: function _handleOnFocus() {
      var isFocus = this.state.isFocus;

      if (!isFocus) {
        this.setState({
          isOpen: true
        }, this._handleSetFocus.bind(this));
      }
    }
  }, {
    key: "_handleOnBlur",
    value: function _handleOnBlur() {
      var onBlur = this.props.onBlur;
      this.setState({
        isOpen: false
      }, function () {
        onBlur();
      });
    }
  }, {
    key: "_handleOnChange",
    value: function _handleOnChange(option) {
      var _this3 = this;

      var onChange = this.props.onChange;
      this.setState({
        isOpen: false
      }, function () {
        return onChange && onChange(_this3._applyValue(option));
      });
    }
  }, {
    key: "_handleInputOnChange",
    value: function _handleInputOnChange(event) {
      var value = event['target'].value;
      this.setState({
        value: value
      });
    }
  }, {
    key: "_handleResetValue",
    value: function _handleResetValue() {
      var onChange = this.props.onChange;
      this.setState({
        isOpen: false
      }, function () {
        return onChange && onChange(null);
      });
    }
  }, {
    key: "_renderInput",
    value: function _renderInput() {
      var inputValue = this.state.value;
      var _this$props3 = this.props,
          value = _this$props3.value,
          optionValue = _this$props3.optionValue;
      return React.createElement("input", {
        ref: this.inputRef,
        className: styles['select__input'],
        value: inputValue || value && value[optionValue],
        onBlur: this._handleOnBlur.bind(this),
        onChange: this._handleInputOnChange.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 224
        },
        __self: this
      });
    }
  }, {
    key: "_renderValue",
    value: function _renderValue() {
      var value = this.props.value;
      var selectedValue = value && this._getValue(value) || null;
      return React.createElement("span", {
        className: styles['select__values'],
        onClick: this._handleOnFocus.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 238
        },
        __self: this
      }, selectedValue ? React.createElement("span", {
        className: styles['select__value'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 240
        },
        __self: this
      }, selectedValue) : React.createElement("span", {
        className: styles['select__placeholder'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 241
        },
        __self: this
      }, "\u0412\u044B\u0431\u0435\u0440\u0438 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"));
    }
  }, {
    key: "_renderCancel",
    value: function _renderCancel() {
      var classNameMarker = cn(styles['select__marker'], 'fas fa-times');
      return React.createElement("span", {
        className: styles['select__cross'],
        onClick: this._handleResetValue.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 249
        },
        __self: this
      }, React.createElement("span", {
        className: classNameMarker,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 250
        },
        __self: this
      }));
    }
  }, {
    key: "_renderMarker",
    value: function _renderMarker() {
      var isOpen = this.state.isOpen;
      var classNameMarker = cn(styles['select__marker'], {
        'fas fa-angle-down': !isOpen,
        'fas fa-angle-up': isOpen
      });
      return React.createElement("span", {
        className: styles['select__angle'],
        onClick: this._handleOnFocus.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 262
        },
        __self: this
      }, React.createElement("span", {
        className: classNameMarker,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 263
        },
        __self: this
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _cn;

      var isOpen = this.state.isOpen;
      var _this$props4 = this.props,
          className = _this$props4.className,
          disabled = _this$props4.disabled,
          message = _this$props4.message,
          mode = _this$props4.mode,
          options = _this$props4.options,
          optionKey = _this$props4.optionKey,
          optionValue = _this$props4.optionValue,
          value = _this$props4.value,
          label = _this$props4.label;
      var classNameSelectWrapper = cn(className, styles['wrapper'], (_cn = {}, _defineProperty(_cn, styles['wrapper--primary'], mode === PRIMARY_MODE), _defineProperty(_cn, styles['wrapper--success'], mode === SUCCESS_MODE), _defineProperty(_cn, styles['wrapper--info'], mode === INFO_MODE), _defineProperty(_cn, styles['wrapper--danger'], mode === DANGER_MODE), _defineProperty(_cn, styles['wrapper--warning'], mode === WARNING_MODE), _defineProperty(_cn, styles['wrapper--disabled'], disabled), _defineProperty(_cn, styles['wrapper--is-focus'], isOpen), _cn));
      return React.createElement("div", {
        className: classNameSelectWrapper,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 282
        },
        __self: this
      }, label && React.createElement("p", {
        className: styles['label'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 284
        },
        __self: this
      }, label), React.createElement("div", {
        ref: this.selectRef,
        className: styles['select'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 286
        },
        __self: this
      }, React.createElement("span", {
        className: styles['select__content'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 287
        },
        __self: this
      }, this._renderValue()), React.createElement("span", {
        className: styles['select__controls'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 290
        },
        __self: this
      }, !!value && this._renderCancel(), this._renderMarker()), !disabled && message && React.createElement("span", {
        ref: this.messageRef,
        className: styles['tooltip'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 295
        },
        __self: this
      }, React.createElement("span", {
        className: styles['tooltip__message'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 296
        },
        __self: this
      }, message)), isOpen && React.createElement(Options, {
        ref: this.optionsRef,
        options: options,
        optionKey: optionKey,
        optionValue: optionValue,
        onCheck: this._handleOnChange.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 299
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
  simple: types.bool,
  message: types.string,
  mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
  disabled: types.bool,
  value: types.any,
  options: types.array,
  optionKey: types.string,
  optionValue: types.string,
  onChange: types.func,
  onFocus: types.func,
  onBlur: types.func
};
Component.defaultProps = {
  className: '',
  label: '',
  simple: false,
  message: '',
  mode: 'default',
  disabled: false,
  options: [],
  optionKey: 'id',
  optionValue: 'value',
  value: ''
};
export default Component;