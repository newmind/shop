
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import Input from '../../symbols/Input';


const InputField = ({ input, label, mode, type, className, meta: { touched, error } }) => {
  return (
    <Input label={label} className={className} {...input} type={type} message={touched && error || ''} mode={mode || (touched && error && 'danger' || 'default')} />
  );
};

class Component extends PureComponent {
  static propTypes = {
    className: types.string,
    name: types.string,
    mode: types.string,
    label: types.string,
    type: types.string,
    disabled: types.bool,
  };

  render() {
    const { name, label, type, className } = this.props;
    return (
      <Field className={className} name={name} type={type} label={label} component={InputField} />
    );
  }
}

export default Component;
