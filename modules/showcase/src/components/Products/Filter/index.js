
import { CheckBox } from '@ui.packages/kit';
// import { Mode } from '@ui.packages/types';
// import { nounDeclension } from "@ui.packages/utils";
// import { addProductToCart } from '@ui.packages/cart';
// import { pushNotification } from '@ui.packages/notifications';

import React from 'react';
import types from 'prop-types';
import { useSelector } from 'react-redux';

import { selectTypes, selectBrands, selectCategories } from '../../../ducks/slice';

import styles from "./default.module.scss";


function Products() {
  const types = useSelector(selectTypes);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['count']}>
        Найдено 999 товаров
      </div>
      <div className={styles['block']}>
        <div className={styles['header']}>
          Производитель
        </div>
        <div className={styles['content']}>
          {brands.map((item, index) => (
            <div key={index} className={styles['item']}>
              <CheckBox className={styles['check-box']} label={item['value']} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles['block']}>
        <div className={styles['header']}>
          Тип
        </div>
        <div className={styles['content']}>
          {types.map((item) => (
            <div key={item['id']} className={styles['item']}>
              <CheckBox className={styles['check-box']} label={item['value']} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles['block']}>
        <div className={styles['header']}>
          Категория
        </div>
        <div className={styles['content']}>
          {categories.map((item) => (
            <div key={item['id']} className={styles['item']}>
              <CheckBox className={styles['check-box']} label={item['value']} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Products.propTypes = {
  items: types.array,
  meta: types.object,
  onAddToCart: types.func,
};

Products.defaultProps = {
  items: [],
  meta: {},
};

export default Products;
