
import types from 'prop-types';
import React, { PureComponent } from 'react';

import BaseField from '../BaseField';
import Textarea from '../../symbols/Textarea';


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
        <Textarea />
      </BaseField>
    );
  }
}

export default Component;
