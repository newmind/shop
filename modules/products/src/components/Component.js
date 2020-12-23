
import { Button } from '@ui.packages/kit';
import { queryToObject } from "@ui.packages/utils";

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Table from './Table';

import styles from './default.module.scss';


function Products({ getProducts }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(function init() {
    const search = queryToObject(location['search']);
    getProducts(search);
    return () => {
    }
  }, []);

  function handleAddProduct() {
    navigate('/products/create');
  }

  return (
    <section className={styles['wrapper']}>
      <aside className={styles['controls']}>
        <Button
          mode="success"
          onClick={() => handleAddProduct()}
        >Добавить товар</Button>
      </aside>
      <article className={styles['content']}>
        <div className={styles['header']}>
          <h2>Управление витриной</h2>
        </div>
        <div className={styles['filter']}>
          {/*<Filter initialValues={search} onSubmit={(data) => setQuery(data)} />*/}
        </div>
        <div className={styles['table']}>
          <Table />
        </div>
        <div className={styles['paging']}>

        </div>
      </article>
    </section>
  );
}

export default Products;
