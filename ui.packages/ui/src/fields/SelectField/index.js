
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import Select from '../../symbols/Select';


const InputField = ({ input, label, options, simple, optionKey, optionValue, mode, meta: { touched, error }, ...props }) => {
  return (
    <Select
      label={label}
      options={options}
      simple={simple}
      optionKey={optionKey}
      optionValue={optionValue}
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
    options: types.array,
    disabled: types.bool,
    simple: types.bool,
    optionKey: types.string,
    optionValue: types.string,
    optionTransform: types.func,
  };

  render() {
    const { name, label, options, simple, optionKey, optionValue, ...props } = this.props;
    return (
      <Field name={name} options={options} simple={simple} label={label} optionKey={optionKey} optionValue={optionValue} {...props} component={InputField} />
    );
  }
}

export default Component;
