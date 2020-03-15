
import types from 'prop-types';
import { Field } from 'redux-form';
import React, { PureComponent } from 'react';

import Amount from '../../symbols/Amount';


const InputField = ({ input, label, mode, ...props }) => {
  return (
    <Amount {...input} {...props} />
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
