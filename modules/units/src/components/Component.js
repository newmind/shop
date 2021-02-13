
import { openDialog } from "@ui.packages/dialog";
import { Header, Page, PageControls, PageContent, Button } from '@ui.packages/kit';

import React from 'react';
import { useDispatch } from 'react-redux';

import Table from './Table';

import styles from './default.module.scss';


function Units() {
  const dispatch = useDispatch();

  function handleCreate() {
    dispatch(openDialog('unit'));
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
          <header className={styles['header']}>
            <Header level={1}>Единицы измерения</Header>
          </header>
          <article className={styles['content']}>
            <Table />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

Units.propTypes = {};

Units.defaultProps = {};

export default Units;
