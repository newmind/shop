
import { Mode } from '@ui.packages/types';
import { Button, Header, Page, PageControls, PageContent, Paging } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Table from './Table';

import styles from './default.module.scss';

import { selectMeta } from '../ducks/slice';


function Products() {
  const navigate = useNavigate();
  const meta = useSelector(selectMeta);

  function handleAddProduct() {
    navigate('/products/create');
  }

  return (
    <Page className={styles['wrapper']}>
      <PageControls className={styles['aside']}>
        <div className={styles['controls']}>
          <Button
            size={Button.SMALL}
            mode={Mode.SUCCESS}
            onClick={() => handleAddProduct()}
          >Добавить товар</Button>
        </div>
      </PageControls>
      <PageContent className={styles['content']}>
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
          <Paging total={meta['total']} skip={12} />
        </div>
      </PageContent>
    </Page>
  );
}

export default Products;
