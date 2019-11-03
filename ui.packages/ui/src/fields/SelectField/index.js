
import types from 'prop-types';
import React, { PureComponent } from 'react';

import BaseField from '../BaseField';
import Select from '../../symbols/Select';


class Component extends PureComponent {
  static propTypes = {
    name: types.string,
    mode: types.string,
    label: types.string,
    options: types.array,
    disabled: types.bool,
    simple: types.bool,
    defaultKey: types.any,
    optionKey: types.string,
    optionValue: types.string,
    optionTransform: types.func,
  };

  render() {
    const { ...props } = this.props;
    return (
      <BaseField {...props}>
        <Select />
      </BaseField>
    );
  }
}

export default Component;
