
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import Textarea from '../../symbols/Textarea';


const InputField = ({ input, label, mode, type, meta: { touched, error } }) => {
  return (
    <Textarea label={label} {...input} type={type} message={touched && error || ''} mode={mode || (touched && error && 'danger' || 'default')} />
  );
};

class Component extends PureComponent {
  static propTypes = {
    name: types.string,
    mode: types.string,
    label: types.string,
    type: types.string,
    disabled: types.bool,
  };

  render() {
    const { name, label, type } = this.props;
    return (
      <Field name={name} type={type} label={label} component={InputField} />
    );
  }
}

export default Component;
