
import { queryToObject, objectToQuery } from "@ui.packages/utils";

import React from 'react';
import { useNavigate } from 'react-router-dom';

import Form from './Form';


function Filter() {
  const query = queryToObject(location['search']);
  const navigate = useNavigate();

  function handleSubmit(data) {
    data['page'] = 1;
    navigate(objectToQuery(data));
  }

  return (
    <Form
      initialValues={query}
      onSubmit={handleSubmit}
    />
  );
}

export default Filter;
