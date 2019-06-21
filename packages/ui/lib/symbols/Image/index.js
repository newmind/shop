import _defineProperty from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _regeneratorRuntime from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator";
import _asyncToGenerator from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/symbols/Image/index.js";
import types from 'prop-types';
import React, { PureComponent } from 'react';
import Spinner from '../Spinner';
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

  _createClass(Component, null, [{
    key: "getSize",
    value: function getSize(element) {
      var rect = element.getBoundingClientRect();
      return {
        width: rect['width'],
        height: rect['height']
      };
    }
  }]);

  function Component(props) {
    var _this;

    _classCallCheck(this, Component);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this, props));
    _this.timeOutInstance = null;
    _this.wrapperRef = React.createRef();
    _this.imageRef = React.createRef();
    _this.state = {
      isLoading: true,
      isError: false
    };
    return _this;
  }

  _createClass(Component, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var imageElement = this.imageRef.current;
      var src = this.props.src;
      var state = {
        isError: false
      };

      if (src !== nextProps['src']) {
        imageElement.style['width'] = 'auto';
        imageElement.style['height'] = 'auto';
        state['isLoading'] = true;
      }

      this.setState(state);
    }
  }, {
    key: "_handleLoad",
    value: function () {
      var _handleLoad2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var wrapperElement, imageElement, wrapperSize, imageSize;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                wrapperElement = this.wrapperRef.current;
                imageElement = this.imageRef.current;
                wrapperSize = Component.getSize(wrapperElement);
                imageElement.style['width'] = wrapperSize['width'] + 'px';
                imageSize = Component.getSize(imageElement);

                if (imageSize['width'] < wrapperSize['width']) {
                  imageElement.style['width'] = wrapperSize['width'] + 'px';
                  imageElement.style['height'] = 'auto';
                }

                if (imageSize['height'] < wrapperSize['height']) {
                  imageElement.style['width'] = 'auto';
                  imageElement.style['height'] = wrapperSize['height'] + 'px';
                }

                imageSize = Component.getSize(imageElement);
                imageElement.style['margin-top'] = "-".concat(imageSize['height'] / 2, "px");
                imageElement.style['margin-left'] = "-".concat(imageSize['width'] / 2, "px");
                this.timeOutInstance = setTimeout(function () {
                  return _this2.setState({
                    isLoading: false,
                    isError: false
                  });
                }, 300);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _handleLoad() {
        return _handleLoad2.apply(this, arguments);
      }

      return _handleLoad;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timeOutInstance);
    }
  }, {
    key: "_handleError",
    value: function _handleError() {
      this.setState({
        isLoading: false,
        isError: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _cn;

      var _this$state = this.state,
          isLoading = _this$state.isLoading,
          isError = _this$state.isError;
      var _this$props = this.props,
          className = _this$props.className,
          src = _this$props.src,
          mode = _this$props.mode;
      var classNameImageWrapper = cn(className, styles['wrapper'], (_cn = {}, _defineProperty(_cn, styles['wrapper--in-process'], isLoading), _defineProperty(_cn, styles['wrapper--error'], isError), _defineProperty(_cn, styles['wrapper--primary'], mode === PRIMARY_MODE), _defineProperty(_cn, styles['wrapper--success'], mode === SUCCESS_MODE), _defineProperty(_cn, styles['wrapper--info'], mode === INFO_MODE), _defineProperty(_cn, styles['wrapper--danger'], mode === DANGER_MODE), _defineProperty(_cn, styles['wrapper--warning'], mode === WARNING_MODE), _cn));
      return React.createElement("div", {
        ref: this.wrapperRef,
        className: classNameImageWrapper,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        },
        __self: this
      }, React.createElement("img", {
        ref: this.imageRef,
        className: styles['image'],
        src: src,
        onLoad: this._handleLoad.bind(this),
        onError: this._handleError.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }), isLoading && React.createElement("div", {
        className: styles['loading'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        },
        __self: this
      }, React.createElement(Spinner, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        },
        __self: this
      })), isError && React.createElement("div", {
        className: styles['error'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        },
        __self: this
      }, React.createElement("span", {
        className: styles['error__title'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }, "\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E", React.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }), "\u043D\u0435 \u0442\u0430\u043A")));
    }
  }]);

  return Component;
}(PureComponent);

Component.propTypes = {
  className: types.string,
  src: types.string,
  mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default'])
};
Component.defaultProps = {
  className: '',
  src: '',
  mode: 'default'
};
export default Component;