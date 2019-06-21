import _defineProperty from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/symbols/Table/index.js";
import types from 'prop-types';
import React, { PureComponent } from 'react';
import CheckBox from '../CheckBox';
import cn from 'classnames';
import styles from './default.module.scss';
var PRIMARY_MODE = 'primary';
var INFO_MODE = 'info';
var WARNING_MODE = 'warning';
var DANGER_MODE = 'danger';
var SUCCESS_MODE = 'success';

var Header =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Header, _PureComponent);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      var _cn;

      var _this$props = this.props,
          title = _this$props.title,
          _this$props$attrs = _this$props.attrs,
          attrs = _this$props$attrs === void 0 ? {} : _this$props$attrs;
      var _attrs$width = attrs.width,
          width = _attrs$width === void 0 ? 'auto' : _attrs$width,
          _attrs$align = attrs.align,
          align = _attrs$align === void 0 ? 'left' : _attrs$align;
      var titleClassName = cn(styles['table__title'], (_cn = {}, _defineProperty(_cn, styles['table__title--right'], align === 'right'), _defineProperty(_cn, styles['table__title--center'], align === 'center'), _cn));
      return React.createElement("td", {
        style: {
          width: width
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: this
      }, title && React.createElement("span", {
        className: titleClassName,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        },
        __self: this
      }, title));
    }
  }]);

  return Header;
}(PureComponent);

var Column =
/*#__PURE__*/
function (_PureComponent2) {
  _inherits(Column, _PureComponent2);

  function Column() {
    _classCallCheck(this, Column);

    return _possibleConstructorReturn(this, _getPrototypeOf(Column).apply(this, arguments));
  }

  _createClass(Column, [{
    key: "render",
    value: function render() {
      var _cn2;

      var _this$props2 = this.props,
          data = _this$props2.data,
          template = _this$props2.template,
          transform = _this$props2.transform,
          _this$props2$attrs = _this$props2.attrs,
          attrs = _this$props2$attrs === void 0 ? {} : _this$props2$attrs;
      var _attrs$align2 = attrs.align,
          align = _attrs$align2 === void 0 ? 'left' : _attrs$align2,
          _attrs$vAlign = attrs.vAlign,
          vAlign = _attrs$vAlign === void 0 ? 'top' : _attrs$vAlign;
      var colClassName = cn(styles['table__col'], (_cn2 = {}, _defineProperty(_cn2, styles['table__col--right'], align === 'right'), _defineProperty(_cn2, styles['table__col--center'], align === 'center'), _cn2));
      return React.createElement("td", {
        style: {
          verticalAlign: vAlign
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: this
      }, template ? template(data) : React.createElement("span", {
        className: colClassName,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, transform ? transform(data) : data));
    }
  }]);

  return Column;
}(PureComponent);

Column.propTypes = {
  data: types.any,
  template: types.func,
  transform: types.func
};
Column.defaultProps = {
  data: null
};

var Line =
/*#__PURE__*/
function (_PureComponent3) {
  _inherits(Line, _PureComponent3);

  function Line() {
    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, _getPrototypeOf(Line).apply(this, arguments));
  }

  _createClass(Line, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          useCheck = _this$props3.useCheck,
          columns = _this$props3.columns,
          model = _this$props3.model;
      return React.createElement("tr", {
        className: styles['table__row'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        },
        __self: this
      }, useCheck && React.createElement("td", {
        style: {
          width: '40px',
          textAlign: 'center',
          verticalAlign: 'middle',
          fontSize: 0
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        },
        __self: this
      }, React.createElement(CheckBox, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        },
        __self: this
      })), columns.map(function (column, key) {
        var alias = column['alias'] || null;
        var data = alias ? model[alias] : model;
        return React.createElement(Column, Object.assign({
          key: key,
          data: data
        }, column, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 86
          },
          __self: this
        }));
      }));
    }
  }]);

  return Line;
}(PureComponent);

Line.propTypes = {
  columns: types.array,
  model: types.object
};
Line.defaultProps = {
  columns: [],
  model: {}
};

var Component =
/*#__PURE__*/
function (_PureComponent4) {
  _inherits(Component, _PureComponent4);

  function Component() {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, _getPrototypeOf(Component).apply(this, arguments));
  }

  _createClass(Component, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          className = _this$props4.className,
          items = _this$props4.items,
          columns = _this$props4.columns,
          empty = _this$props4.empty,
          useCheck = _this$props4.useCheck;
      var tableClassName = cn(styles['table'], className);
      return React.createElement("div", {
        className: styles['wrapper'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }, React.createElement("table", {
        className: tableClassName,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        },
        __self: this
      }, React.createElement("thead", {
        className: styles['table__thead'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        },
        __self: this
      }, React.createElement("tr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }, useCheck && React.createElement("td", {
        style: {
          width: '40px',
          textAlign: 'center',
          verticalAlign: 'middle',
          fontSize: 0
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        },
        __self: this
      }, React.createElement(CheckBox, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        },
        __self: this
      })), columns.map(function (column, key) {
        return React.createElement(Header, Object.assign({
          key: key
        }, column, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 124
          },
          __self: this
        }));
      }))), React.createElement("tbody", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }, items.map(function (item, key) {
        return React.createElement(Line, {
          key: key,
          useCheck: useCheck,
          columns: columns,
          model: item,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 128
          },
          __self: this
        });
      })), !items['length'] && React.createElement("caption", {
        className: styles['table__caption'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        },
        __self: this
      }, empty)));
    }
  }]);

  return Component;
}(PureComponent);

Component.propTypes = {
  className: types.string,
  items: types.array,
  columns: types.array,
  empty: types.string,
  useCheck: types.bool
};
Component.defaultProps = {
  className: '',
  items: [],
  columns: [],
  empty: 'Нет данных',
  useCheck: false
};
export default Component;