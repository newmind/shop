
import types from 'prop-types';
import { Field } from 'redux-form';
import React, { PureComponent } from 'react';

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
    const { name, ...props } = this.props;
    return (
      <Field name={name} {...props} component={InputField} />
    );
  }
}

export default Component;
