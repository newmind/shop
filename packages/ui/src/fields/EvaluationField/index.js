
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import Evaluation from '../../symbols/Evaluation';


const EvaluationField = ({ input, type, mode, meta: { touched, error } }) => {
  return (
    <Evaluation type={type} message={touched && error || ''} mode={(touched && error && 'danger') || mode} {...input} value={input['value'] || 0} />
  );
};

class Component extends PureComponent {
  static propTypes = {
    name: types.string,
    mode: types.string,
    disabled: types.bool,
  };

  static defaultProps = {
    name: '',
    mode: 'default',
    disabled: false,
  };

  render() {
    const { name, label, mode, disabled } = this.props;
    return (
      <Field name={name} mode={mode} label={label} disabled={disabled} component={EvaluationField} />
    );
  }
}

export default Component;
