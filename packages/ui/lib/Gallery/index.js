import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/Gallery/index.mjs";
import types from 'prop-types';
import React, { PureComponent } from 'react';
import Image from '../symbols/Image';
import cn from 'classnames';
import styles from './default.module.scss';

var Component =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Component, _PureComponent);

  function Component(props) {
    var _this;

    _classCallCheck(this, Component);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this, props));
    var index = props.index;
    _this.state = {
      activeIndex: index
    };
    return _this;
  }

  _createClass(Component, [{
    key: "_handlePrevClick",
    value: function _handlePrevClick() {
      var activeIndex = this.state.activeIndex;
      var items = this.props.items;
      activeIndex--;

      if (activeIndex < 0) {
        activeIndex = items.length - 1;
      }

      this.setState({
        activeIndex: activeIndex
      });
    }
  }, {
    key: "_handleNextClick",
    value: function _handleNextClick() {
      var activeIndex = this.state.activeIndex;
      var items = this.props.items;
      activeIndex++;

      if (activeIndex > items.length - 1) {
        activeIndex = 0;
      }

      this.setState({
        activeIndex: activeIndex
      });
    }
  }, {
    key: "_getFileName",
    value: function _getFileName() {
      var activeIndex = this.state.activeIndex;
      var _this$props = this.props,
          path = _this$props.path,
          valueKey = _this$props.valueKey,
          items = _this$props.items;
      var fileSrc = items[activeIndex];

      if (fileSrc && fileSrc.constructor === Object) {
        fileSrc = fileSrc[valueKey];
      }

      return fileSrc ? "".concat(path, "/").concat(fileSrc) : '';
    }
  }, {
    key: "render",
    value: function render() {
      var activeIndex = this.state.activeIndex;
      var _this$props2 = this.props,
          className = _this$props2.className,
          items = _this$props2.items,
          isList = _this$props2.isList;
      var hasCount = Component.hasCountItems(items);
      var classNameGalleryWrapper = cn(className, styles['gallery']);
      var classNamePrevItem = cn(styles['gallery__icon'], 'fa fa-chevron-left');
      var classNameNextItem = cn(styles['gallery__icon'], 'fa fa-chevron-right');

      var src = this._getFileName();

      return React.createElement("div", {
        className: classNameGalleryWrapper,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        },
        __self: this
      }, isList && hasCount && React.createElement("span", {
        className: styles['gallery__prev'],
        onClick: this._handlePrevClick.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        },
        __self: this
      }, React.createElement("span", {
        className: classNamePrevItem,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: this
      })), React.createElement("div", {
        className: styles['gallery__content'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        },
        __self: this
      }, React.createElement(Image, {
        src: src,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        },
        __self: this
      }), isList && hasCount && React.createElement("div", {
        className: styles['gallery__count'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 92
        },
        __self: this
      }, React.createElement("span", {
        className: styles['gallery__numbers'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        },
        __self: this
      }, activeIndex + 1, " \u0438\u0437 ", items.length))), isList && hasCount && React.createElement("span", {
        className: styles['gallery__next'],
        onClick: this._handleNextClick.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        },
        __self: this
      }, React.createElement("span", {
        className: classNameNextItem,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        },
        __self: this
      })));
    }
  }]);

  return Component;
}(PureComponent);

Component.propTypes = {
  className: types.string,
  valueKey: types.string,
  path: types.string,
  items: types.array,
  index: types.number,
  isList: types.bool
};
Component.defaultProps = {
  className: '',
  valueKey: null,
  path: '',
  items: [],
  index: 0,
  isList: true
};

Component.hasCountItems = function (items) {
  return items.length > 1;
};

export default Component;