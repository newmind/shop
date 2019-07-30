
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import RadioBox from '../../symbols/RadioBox';


const InputField = ({ input, mode, ...props }) => {
  return (
    <RadioBox {...input} {...props} />
  );
};

class Component extends PureComponent {
  static propTypes = {
    name: types.string,
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
