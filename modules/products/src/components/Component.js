
import { Mode } from '@ui.packages/types';
import { queryToObject, objectToQuery } from '@ui.packages/utils';
import { Button, Header, Page, PageControls, PageContent, Paging } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import Filter from './Filter';
import Table from './Table';

import styles from './default.module.scss';

import { selectMeta } from '../ducks/slice';


function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const meta = useSelector(selectMeta);

  const query = queryToObject(location['search']);

  function handleAddProduct() {
    navigate('/products/create');
  }

  function handleFilterSubmit(formData) {
    formData['page'] = 1;
    navigate(objectToQuery(formData));
  }

  return (
    <Page>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            mode={Mode.PRIMARY}
            form={Button.FORM_CONTEXT}
            onClick={() => handleAddProduct()}
          >Добавить товар</Button>
        </div>
      </PageControls>
      <PageContent>
        <div className={styles['header']}>
          <Header level={1}>Каталог</Header>
        </div>
        <div className={styles['filter']}>
          <Filter initialValues={query} onSubmit={handleFilterSubmit} />
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
