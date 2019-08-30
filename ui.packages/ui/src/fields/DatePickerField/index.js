
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import DatePicker from '../../symbols/DatePicker';


const InputField = ({ input, label, mode, meta: { touched, error }, ...props }) => {
  return (
    <DatePicker
      label={label}
      {...input}
      {...props}
      message={touched && error || ''}
      mode={mode || (touched && error && 'danger' || 'default')}
    />
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
    const { name, label, options, simple, optionKey, optionValue, ...props } = this.props;
    return (
      <Field name={name} options={options} simple={simple} label={label} optionKey={optionKey} optionValue={optionValue} {...props} component={InputField} />
    );
  }
}

export default Component;
