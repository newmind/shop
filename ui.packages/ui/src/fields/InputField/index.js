
import types from 'prop-types';
import React, { PureComponent } from 'react';

import BaseField from '../BaseField';
import Input from '../../symbols/Input';


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
    const { ...props } = this.props;
    return (
      <BaseField {...props}>
        <Input />
      </BaseField>
    );
  }
}

export default Component;
