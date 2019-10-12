
import types from 'prop-types';
import React, { PureComponent } from 'react';

import Product from './Product';


class Component extends PureComponent {
  static propTypes = {
    fields: types.object,
  };

  static defaultProps = {
    fields: {},
  };

  render() {
    const { fields } = this.props;
    return fields.map((field, index) => {
      const product = fields.get(index);
      return (
        <Product key={index} field={field} {...product} />
      );
    });
  }
}

export default Component;
