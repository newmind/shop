
import types from 'prop-types';
import React, { PureComponent } from 'react';

import BaseField from "../BaseField";
import FileInput from '../../symbols/FileInput';


class Component extends PureComponent {
  static propTypes = {
    name: types.string,
    mode: types.string,
    label: types.string,
    type: types.string,
    disabled: types.bool,
  };

  render() {
    const { error, ...props } = this.props;
    return (
      <BaseField { ...props } message={error}>
        <FileInput />
      </BaseField>
    );
  }
}

export default Component;
