
import { CheckBox } from '@ui.packages/kit';
import { queryToObject, objectToQuery, nounDeclension } from "@ui.packages/utils";

import React, { useState, useEffect } from 'react';
import types from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { selectTypes, selectBrands, selectCategories, selectMeta } from '../../ducks/slice';

import styles from "./default.module.scss";


function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = queryToObject(location['search']);

  if (query['brand'] && ! (query['brand'] instanceof Array)) {
    query['brand'] = [query['brand']];
  }

  if (query['typeId'] && ! (query['typeId'] instanceof Array)) {
    query['typeId'] = [query['typeId']];
  }

  if (query['categoryId'] && ! (query['categoryId'] instanceof Array)) {
    query['categoryId'] = [query['categoryId']];
  }

  const meta = useSelector(selectMeta);
  const types = useSelector(selectTypes);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);

  const [brandId, setBrandId] = useState(query['brandId'] || []);
  const [typeId, setTypesId] = useState(query['typeId'] || []);
  const [categoryId, setCategoryId] = useState(query['categoryId'] || []);

  useEffect(() => {
    navigate(objectToQuery({ ...query, brandId, typeId, categoryId }));
  }, [brandId, typeId, categoryId]);

  function handleChangeBrands(id) {
    const brands = [...brandId];
    const index = brands.indexOf(id);
    if (index > -1) {
      brands.splice(index, 1);
    }
    else {
      brands.push(id);
    }
    setBrandId(brands);
  }

  function handleChangeTypes(id) {
    const types = [...typeId];
    const index = types.indexOf(id);
    if (index > -1) {
      types.splice(index, 1);
    }
    else {
      types.push(id);
    }
    setTypesId(types);
  }

  function handleChangeCategories(id) {
    const categories = [...categoryId];
    const index = categories.indexOf(id);
    if (index > -1) {
      categories.splice(index, 1);
    }
    else {
      categories.push(id);
    }
    setCategoryId(categories);
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['count']}>
        Найдено { meta['total'] } {nounDeclension(meta['total'], ['товар', 'товара', 'товаров'])}
      </div>
      <div className={styles['block']}>
        <div className={styles['header']}>
          Тип
        </div>
        <div className={styles['content']}>
          {types.map((item) => (
            <div key={item['id']} className={styles['item']}>
              <CheckBox
                className={styles['check-box']}
                label={item['value'] + ' [' + item['count'] + ']'}
                disabled={ ! item['count']}
                value={ !!~ typeId.indexOf(item['id'])}
                onChange={() => handleChangeTypes(item['id'])}
              />
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
              <CheckBox
                className={styles['check-box']}
                label={item['value'] + ' [' + item['count'] + ']'}
                disabled={ ! item['count']}
                value={ !!~ categoryId.indexOf(item['id'])}
                onChange={() => handleChangeCategories(item['id'])}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles['block']}>
        <div className={styles['header']}>
          Производитель
        </div>
        <div className={styles['content']}>
          {brands.map((item) => (
            <div key={item['id']} className={styles['item']}>
              <CheckBox
                className={styles['check-box']}
                label={item['value'] + ' [' + item['count'] + ']'}
                disabled={ ! item['count']}
                value={ !!~ brandId.indexOf(item['id'])}
                onChange={() => handleChangeBrands(item['id'])}
              />
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
