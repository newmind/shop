
import types from 'prop-types';
import { Field } from 'redux-form';
import React, { PureComponent } from 'react';

import Evaluation from '../../symbols/Evaluation';


const EvaluationField = ({ input, type, mode, size, label, meta: { touched, error } }) => {
  return (
    <Evaluation
      type={type}
      label={label}
      size={size}
      message={touched && error || ''}
      mode={(touched && error && 'danger') || mode}
      {...input}
      value={input['value'] || 0}
    />
  );
};

class Component extends PureComponent {
  static propTypes = {
    label: types.string,
    name: types.string,
    mode: types.string,
    size: types.string,
    disabled: types.bool,
  };

  static defaultProps = {
    label: '',
    name: '',
    size: 'm',
    mode: 'default',
    disabled: false,
  };

  render() {
    const { name, label, mode, size, disabled } = this.props;
    return (
      <Field name={name} mode={mode} size={size} label={label} disabled={disabled} component={EvaluationField} />
    );
  }
}

export default Component;
