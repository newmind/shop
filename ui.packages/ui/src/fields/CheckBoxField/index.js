
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import CheckBox from '../../symbols/CheckBox';


const InputField = ({ input, label, mode, meta: { touched, error }, ...props }) => {
  return (
    <CheckBox label={label} {...input} {...props} mode={mode || (touched && error && 'danger' || 'default')} />
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
