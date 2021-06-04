
import { Button, Header, Page, PageControls, PageContent, Paging } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Filter from './Filter';
import Table from './Table';

import styles from './default.module.scss';

import { selectMeta, selectInProcess } from '../ducks/slice';


function Products() {
  const navigate = useNavigate();
  const meta = useSelector(selectMeta);
  const inProcess = useSelector(selectInProcess);

  function handleAddProduct() {
    navigate('/products/create');
  }

  return (
    <Page inProcess={inProcess}>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_CREATE}
            mode={Button.MODE_SUCCESS}
            disabled={inProcess}
            onClick={() => handleAddProduct()}
          >Добавить</Button>
        </div>
      </PageControls>
      <PageContent>
        <div className={styles['header']}>
          <Header level={1}>Каталог товаров</Header>
        </div>
        <div className={styles['filter']}>
          <Filter />
        </div>
        <div className={styles['table']}>
          <Table />
        </div>
        {meta['total'] > 12 && (
          <div className={styles['paging']}>
            <Paging total={meta['total']} skip={12} />
          </div>
        )}
      </PageContent>
    </Page>
  );
}

export default Products;
