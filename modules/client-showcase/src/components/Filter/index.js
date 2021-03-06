
import { queryToObject, objectToQuery, nounDeclension } from "@ui.packages/utils";

import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Block from './Block';

import { selectTypes, selectBrands, selectCategories, selectMeta } from '../../ducks/slice';

import cn from 'classnames';
import styles from "./default.module.scss";


function Filter() {
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
    delete query['page'];
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
    delete query['page'];
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
    delete query['page'];
    navigate(objectToQuery({ ...query, categoryId: categories }));
  }

  function handleFilterReset() {
    navigate(objectToQuery({}));
  }

  const filterQuery = { ...query };
  delete filterQuery['page'];

  return (
    <div className={styles['wrapper']}>
      <div className={styles['count']}>
        <div className={styles['value']}>
          ?????????????? { meta['total'] } {nounDeclension(meta['total'], ['??????????', '????????????', '??????????????'])}
        </div>
        { !! Object.keys(filterQuery).length && (
          <div className={styles['control']}>
            <span className={cn(styles['icon'], 'fas fa-times')} onClick={() => handleFilterReset()} />
          </div>
        )}
      </div>
      <Block
        title="??????"
        items={types}
        values={typeId}
        onChange={(id) => handleChangeTypes(id)}
      />
      <Block
        title="??????????????????"
        items={categories}
        values={categoryId}
        onChange={(id) => handleChangeCategories(id)}
      />
      <Block
        title="??????????????????????????"
        items={brands}
        values={brandId}
        onChange={(id) => handleChangeBrands(id)}
      />
    </div>
  );
}

export default Filter;
