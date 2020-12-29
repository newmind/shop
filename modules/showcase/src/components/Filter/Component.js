
import {objectToQuery, queryToObject} from "@ui.packages/utils";

import React from 'react';
import types from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

import Form from './Form';


function Filter({ types, categories, brands, colors, forms, materials, inProcess }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { minAmount, maxAmount, ...query } = queryToObject(location['search']);

  function handleFilter({ amount, ...formData }) {
    formData['page'] = 1;
    formData['minAmount'] = amount[0];
    formData['maxAmount'] = amount[1];

    navigate(objectToQuery(formData));
  }

  return (
    <Form
      onSubmit={handleFilter}
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
