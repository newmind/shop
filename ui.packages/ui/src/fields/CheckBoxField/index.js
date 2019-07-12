
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import CheckBox from '../../symbols/CheckBox';


const InputField = ({ input, label, mode, meta: { touched, error } }) => {
  return (
    <CheckBox label={label} {...input} mode={mode || (touched && error && 'danger' || 'default')} />
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
    const { name, label } = this.props;
    return (
      <Field name={name} label={label} component={InputField} />
    );
  }
}

export default Component;
