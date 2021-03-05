
import { queryToObject, objectToQuery } from "@ui.packages/utils";

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Select from './Select';

import styles from './default.module.scss';


function Controls() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = queryToObject(location['search']);

  function handleChange(value) {
    navigate(objectToQuery({ ...query, sort: value }));
  }

  return (
    <div className={styles['wrapper']}>
      <Select
        items={[
          // { title: 'Рейтинг', name: 'evaluation', direct: 'desc' },
          // { title: 'Рейтинг', name: 'evaluation', direct: 'asc' },
          { title: 'Цена', name: 'price', direct: 'desc' },
          { title: 'Цена', name: 'price', direct: 'asc' },
        ]}
        onChange={(value) => handleChange(value)}
      />
    </div>
  );
}

export default Controls;
