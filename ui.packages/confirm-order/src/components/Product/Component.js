
import types from "prop-types";
import React, { PureComponent } from 'react';

import { Gallery } from "@ui.packages/ui";
import numeral from "@ui.packages/numeral";

import cn from "classnames";
import styles from "./defaults.module.scss";


class Component extends PureComponent {
  static propTypes = {
    id: types.number,
    gallery: types.array,
    brand: types.string,
    name: types.string,
    amount: types.number,
    onRemove: types.func,
  };

  static defaultProps = {
    id: null,
    gallery: [],
    brand: '',
    name: '',
    amount: 0.00,
  };

  render() {
    const { id, product: { gallery, brand, name }, amount, currency, onRemove } = this.props;
    const classNameRemoveProduct = cn(styles['remove'], 'far fa-trash-alt');
    return (
      <div className={styles['item']}>
        <div className={styles['item__promo']}>
          <Gallery items={gallery} isList={false} valueKey="externalId" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
        </div>
        <div className={styles['item__description']}>
          <div className={styles['item__names']}>
            <p className={styles['item__brand']}>{ brand }</p>
            <p className={styles['item__name']}>{ name }</p>
          </div>
          <div className={styles['item__count']}>
            <p className={styles['item__amount']}>{numeral(amount).format()} {currency['value']}</p>
          </div>
        </div>
        <div className={styles['item__controls']}>
          <span className={classNameRemoveProduct} onClick={onRemove.bind(this, id)} />
        </div>
      </div>
    );
  }
}

export default Component;