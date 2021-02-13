
import { openDialog } from "@ui.packages/dialog";
import { Button, Header, Page, PageContent, PageControls } from '@ui.packages/kit';

import React from 'react';
import { useDispatch } from 'react-redux';

import Table from './Table';

import styles from './default.module.scss';


function Types() {
  const dispatch = useDispatch();

  function handleCreate() {
    dispatch(openDialog('type'));
  }

  return (
    <Page>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_CREATE}
            onClick={() => handleCreate()}
          >Добавить</Button>
        </div>
      </PageControls>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Тип продукта</Header>
          </div>
          <article className={styles['content']}>
            <Table />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

Types.propTypes = {};

Types.defaultProps = {};

export default Types;
