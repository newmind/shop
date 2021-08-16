
import { selectInProcess } from '@modules/admin-shops';

import { Button, Header, Page, PageContent, PageControls } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Table from './Table';

import styles from './default.module.scss';


function Shops() {
  const navigate = useNavigate();

  const inProcess = useSelector(selectInProcess);

  function handleCreate() {
    navigate(process.env['PUBLIC_URL'] + '/shops/create');
  }

  return (
    <Page inProcess={inProcess}>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_CREATE}
            mode={Button.MODE_SUCCESS}
            disabled={inProcess}
            onClick={() => handleCreate()}
          >Добавить</Button>
        </div>
      </PageControls>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Магазины</Header>
          </div>
          <article className={styles['content']}>
            <Table />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

Shops.propTypes = {};

Shops.defaultProps = {};

export default Shops;
