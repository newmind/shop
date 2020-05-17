
import types from 'prop-types';
import { Field } from 'redux-form';
import React, { PureComponent } from 'react';

import CheckBox from '../../symbols/CheckBox';


const InputField = ({ input, label, mode, meta: { touched, error }, ...props }) => {
  let value = input['value'];
  if (typeof value !== 'boolean') {
    value = false;
  }
  return (
    <CheckBox label={label} {...input} value={value} {...props} mode={mode || (touched && error && 'danger' || 'default')} />
  );
};

class Component extends PureComponent {
  static propTypes = {
    name: types.string,
    mode: types.string,
    label: types.string,
    disabled: types.bool,
  };

  render() {
    const { name, label, ...props } = this.props;
    return (
      <Field name={name} label={label} {...props} component={InputField} />
    );
  }
}

export default Component;
