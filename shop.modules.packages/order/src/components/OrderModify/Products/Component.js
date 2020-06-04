
import types from 'prop-types';
import React, { lazy, PureComponent, Suspense } from 'react';


const Product = lazy(() => import(/* webpackChunkName: "order.product" */'./Product'));


class Component extends PureComponent {
  static propTypes = {
    fields: types.object,
  };

  static defaultProps = {
    fields: {},
  };

  render() {
    const { fields } = this.props;

    return (
      <Suspense fallback={null}>
        {fields.map((field, index) => {
          const product = fields.get(index);

          return (
            <Product key={index} index={index} field={field} {...product} />
          );
        })}
      </Suspense>
    );
  }
}

export default Component;
