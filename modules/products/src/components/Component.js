
import { Mode } from '@ui.packages/types';
import { Button, Header } from '@ui.packages/kit';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import Table from './Table';

import styles from './default.module.scss';


function Products() {
  const navigate = useNavigate();

  function handleAddProduct() {
    navigate('/products/create');
  }

  return (
    <section className={styles['wrapper']}>
      <aside className={styles['aside']}>
        <div className={styles['controls']}>
          <Button
            size={Button.SMALL}
            mode={Mode.SUCCESS}
            onClick={() => handleAddProduct()}
          >Добавить товар</Button>
        </div>
      </aside>
      <article className={styles['content']}>
        <div className={styles['header']}>
          <Header level={1}>Управление витриной</Header>
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
