import _defineProperty from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
var _jsxFileName = "/home/viktor/projects/shop/packages/notifications/src/components/Component.js";
import types from 'prop-types';
import React, { PureComponent } from 'react';
import cn from 'classnames';
import styles from './defaults.module.scss';

var Notification =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Notification, _PureComponent);

  function Notification() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Notification);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Notification)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this._timeout = null;
    return _this;
  }

  _createClass(Notification, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          autoClose = _this$props.autoClose,
          timeout = _this$props.timeout;

      if (autoClose) {
        this._timeout = setTimeout(function () {
          return _this2._handleClose();
        }, timeout);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
    }
  }, {
    key: "_handleClose",
    value: function _handleClose() {
      var _this$props2 = this.props,
          index = _this$props2.index,
          onClose = _this$props2.onClose;
      onClose(index);
    }
  }, {
    key: "render",
    value: function render() {
      var _cn;

      var _this$props3 = this.props,
          title = _this$props3.title,
          content = _this$props3.content,
          mode = _this$props3.mode,
          index = _this$props3.index;
      var classNameClose = cn('fas fa-times', styles['notification__close']);
      var classNameNotification = cn(styles['notification'], (_cn = {}, _defineProperty(_cn, styles['notification--success'], mode === 'success'), _defineProperty(_cn, styles['notification--danger'], mode === 'danger'), _defineProperty(_cn, styles['notification--info'], mode === 'info'), _cn));
      return React.createElement("div", {
        className: classNameNotification,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: this
      }, React.createElement("span", {
        className: classNameClose,
        onClick: this._handleClose.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: this
      }), title && React.createElement("span", {
        className: styles['notification__title'],
        role: "header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        },
        __self: this
      }, title), content && React.createElement("span", {
        className: styles['notification__content'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        },
        __self: this
      }, content));
    }
  }]);

  return Notification;
}(PureComponent);

Notification.propTypes = {
  index: types.string,
  autoClose: types.bool,
  timeout: types.number,
  title: types.string,
  content: types.string,
  mode: types.string,
  onClose: types.func
};
Notification.defaultProps = {
  index: '',
  autoClose: false,
  timeout: 4000,
  title: '',
  content: '',
  mode: 'default'
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
    key: "_handleCloseByIndex",
    value: function _handleCloseByIndex(index) {
      var closeNotification = this.props.closeNotification;
      closeNotification(index);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var notifications = this.props.notifications;
      return React.createElement("div", {
        className: styles['notifications'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: this
      }, React.createElement("div", {
        className: styles['notifications__content'],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        },
        __self: this
      }, notifications.map(function (notification, index) {
        return React.createElement(Notification, Object.assign({
          key: index
        }, notification, {
          onClose: _this3._handleCloseByIndex.bind(_this3),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 89
          },
          __self: this
        }));
      })));
    }
  }]);

  return Component;
}(PureComponent);

Component.propTypes = {
  notifications: types.array,
  closeNotification: types.func
};
Component.defaultProps = {
  notifications: []
};
export default Component;