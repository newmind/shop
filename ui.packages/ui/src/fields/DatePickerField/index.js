
import types from 'prop-types';
import React, { PureComponent } from 'react';

import BaseField from '../BaseField';
import DatePicker from '../../symbols/DatePicker';


class Component extends PureComponent {
  static propTypes = {
    name: types.string,
    mode: types.string,
    label: types.string,
    disabled: types.bool,
  };

  render() {
    const { ...props } = this.props;
    return (
      <BaseField {...props}>
        <DatePicker />
      </BaseField>
    );
  }
}

export default Component;
