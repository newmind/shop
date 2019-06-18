import _regeneratorRuntime from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator";
import _classCallCheck from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
import _asyncToGenerator from "/home/viktor/projects/shop/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
var _jsxFileName = "/home/viktor/projects/shop/packages/ui/src/fields/FileField/index.mjs";
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import FileInput from '../../symbols/FileInput';
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
      var _this$props = this.props,
          name = _this$props.name,
          label = _this$props.label,
          type = _this$props.type;
      return React.createElement(Field, {
        name: name,
        type: type,
        label: label,
        accept: ".jpg",
        component: InputField,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
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