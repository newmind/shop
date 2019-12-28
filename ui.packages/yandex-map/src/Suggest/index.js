
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import Input from './Input';

// import styles from './defaults.module.scss';


class Component extends PureComponent {
  static propTypes = {
    name: types.string,
    label: types.string,
  };

  static defaultProps = {
    name: '',
    label: '',
  };

  render() {
    const { name, label } = this.props;
    return (
      <Field name={name} label={label} component={Input} />
    );
  }
}

export default Component;
