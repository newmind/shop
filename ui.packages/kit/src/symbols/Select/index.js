
import React from 'react';
import types from "prop-types";

import SelectDefault from "./Default";
import SelectMultiselect from "./Multiselect";


function SelectFactory({ type, ...props }) {
  switch(type) {
    case SelectFactory.TYPE_DEFAULT: return <SelectDefault {...props} />;
    case SelectFactory.TYPE_MULTISELECT: return <SelectMultiselect {...props} />;
    default: return <SelectDefault {...props} />;
  }
}


SelectFactory.TYPE_DEFAULT = 'default';
SelectFactory.TYPE_MULTISELECT = 'multiselect';


SelectFactory.propTypes = {
  type: types.oneOf([]),
  simple: types.bool,
  optionKey: types.string,
  optionValue: types.string,
  placeholder: types.string,
  options: types.array,
  value: types.oneOfType([types.string, types.object, types.number, types.array]),
  disabled: types.bool,
  inProcess: types.bool,
  transformValue: types.func,
  onFocus: types.func,
  onChange: types.func,
  onBlur: types.func,
  OptionTemplate: types.elementType,
  onTransformSelectedValue: types.func,
  onTransformOptionValue: types.func,
};

SelectFactory.defaultProps = {
  simple: true,
  optionKey: 'id',
  optionValue: 'value',
  placeholder: 'Выбери значение',
  disabled: false,
  value: null,
  options: [],
  inProcess: false,
  transformValue: null,
  OptionTemplate: null,
  onTransformSelectedValue: null,
  onTransformOptionValue: null,
};

export default SelectFactory;
