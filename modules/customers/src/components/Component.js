
import { openDialog } from "@ui.packages/dialog";
import { Button, Header, Page, PageContent, PageControls } from '@ui.packages/kit';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from './Table';

import styles from './default.module.scss';

import { selectInProcess } from '../ducks/slice';


function Currencies() {
  const dispatch = useDispatch();
  const inProcess = useSelector(selectInProcess);

  function handleCreate() {
    dispatch(openDialog('currency'));
  }

  return (
    <Page>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            mode="success"
            disabled={inProcess}
            onClick={() => handleCreate()}
          >Добавить</Button>
        </div>
      </PageControls>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Клиенты</Header>
          </div>
          <article className={styles['content']}>
            <Table />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

Currencies.propTypes = {};

Currencies.defaultProps = {};

export default Currencies;
