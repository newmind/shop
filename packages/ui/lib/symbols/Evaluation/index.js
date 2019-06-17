import _defineProperty from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/symbols/Evaluation/index.js";
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
    value: function _handleClick(index) {
      var onChange = this.props.onChange;
      onChange && onChange(index);
    }
  }, {
    key: "render",
    value: function render() {
      var _cn;

      var _this$props = this.props,
          className = _this$props.className,
          mode = _this$props.mode,
          value = _this$props.value;
      var classNameEvaluation = cn(className, styles['evaluation'], (_cn = {}, _defineProperty(_cn, styles['evaluation--primary'], mode === PRIMARY_MODE), _defineProperty(_cn, styles['evaluation--success'], mode === SUCCESS_MODE), _defineProperty(_cn, styles['evaluation--info'], mode === INFO_MODE), _defineProperty(_cn, styles['evaluation--danger'], mode === DANGER_MODE), _defineProperty(_cn, styles['evaluation--warning'], mode === WARNING_MODE), _cn));
      return React.createElement("div", {
        className: classNameEvaluation,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        },
        __self: this
      }, React.createElement("span", {
        className: cn(styles['evaluation__star'], {
          'fas fa-star': value >= 1,
          'far fa-star': value < 1
        }),
        onClick: this._handleClick.bind(this, 1),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      }), React.createElement("span", {
        className: cn(styles['evaluation__star'], {
          'fas fa-star': value >= 2,
          'far fa-star': value < 2
        }),
        onClick: this._handleClick.bind(this, 2),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        },
        __self: this
      }), React.createElement("span", {
        className: cn(styles['evaluation__star'], {
          'fas fa-star': value >= 3,
          'far fa-star': value < 3
        }),
        onClick: this._handleClick.bind(this, 3),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }), React.createElement("span", {
        className: cn(styles['evaluation__star'], {
          'fas fa-star': value >= 4,
          'far fa-star': value < 4
        }),
        onClick: this._handleClick.bind(this, 4),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        },
        __self: this
      }), React.createElement("span", {
        className: cn(styles['evaluation__star'], {
          'fas fa-star': value >= 5,
          'far fa-star': value < 5
        }),
        onClick: this._handleClick.bind(this, 5),
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
  value: types.oneOf([0, 1, 2, 3, 4, 5])
};
Component.defaultProps = {
  className: '',
  mode: 'default',
  value: 0
};
export default Component;