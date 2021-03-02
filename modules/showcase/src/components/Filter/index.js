
import { queryToObject, objectToQuery, nounDeclension } from "@ui.packages/utils";

import React from 'react';
import types from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Block from './Block';

import { selectTypes, selectBrands, selectCategories, selectMeta } from '../../ducks/slice';

import cn from 'classnames';
import styles from "./default.module.scss";


function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = queryToObject(location['search']);

  const meta = useSelector(selectMeta);
  const types = useSelector(selectTypes);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);

  let typeId = [];
  let categoryId = [];
  let brandId = [];

  if (query['typeId']) {
    if ( ! (query['typeId'] instanceof Array)) {
      typeId = [query['typeId']];
    }
    else {
      typeId = query['typeId'];
    }
  }

  if (query['categoryId']) {
    if ( ! (query['categoryId'] instanceof Array)) {
      categoryId = [query['categoryId']];
    }
    else {
      categoryId = query['categoryId'];
    }
  }

  if (query['brandId']) {
    if ( ! (query['brandId'] instanceof Array)) {
      brandId = [query['brandId']];
    }
    else {
      brandId = query['brandId'];
    }
  }


  function handleChangeBrands(id) {
    const brands = [...brandId];
    const index = brands.indexOf(id);
    if (index > -1) {
      brands.splice(index, 1);
    }
    else {
      brands.push(id);
    }
    navigate(objectToQuery({ ...query, brandId: brands }));
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
    navigate(objectToQuery({ ...query, typeId: types }));
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
    navigate(objectToQuery({ ...query, categoryId: categories }));
  }

  function handleFilterReset() {
    navigate(objectToQuery({}));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['count']}>
        <div className={styles['value']}>
          Найдено { meta['total'] } {nounDeclension(meta['total'], ['товар', 'товара', 'товаров'])}
        </div>
        { !! Object.keys(query).length && (
          <div className={styles['control']}>
            <span className={cn(styles['icon'], 'fas fa-times')} onClick={() => handleFilterReset()} />
          </div>
        )}
      </div>
      <Block
        title="Тип"
        items={types}
        values={typeId}
        onChange={(id) => handleChangeTypes(id)}
      />
      <Block
        title="Категория"
        items={categories}
        values={categoryId}
        onChange={(id) => handleChangeCategories(id)}
      />
      <Block
        title="Производитель"
        items={brands}
        values={brandId}
        onChange={(id) => handleChangeBrands(id)}
      />
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
