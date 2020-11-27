
import { queryToObject } from "@ui.packages/utils";

import React from 'react';
import types from 'prop-types';
import { useLocation } from 'react-router-dom';

import Form from './Form';


function Filter({ types, categories, brands, colors, forms, materials, inProcess, onSubmit }) {
  const location = useLocation();
  const { minAmount, maxAmount, ...query } = queryToObject(location['search']);

  return (
    <Form
      onSubmit={onSubmit}
      forms={forms}
      types={types}
      brands={brands}
      colors={colors}
      materials={materials}
      categories={categories}
      inProcess={inProcess}
      initialValues={{ ...query, amount: [0, 30000] }}
    />
  );
}

Filter.propTypes = {
  forms: types.array,
  types: types.array,
  brands: types.array,
  colors: types.array,
  materials: types.array,
  categories: types.array,
  inProcess: types.bool,
};

Filter.defaultProps = {
  types: [],
  categories: [],
  brands: [],
  colors: [],
  forms: [],
  materials: [],
  inProcess: false,
};

export default Filter;
