
import { openDialog } from "@ui.packages/dialog";
import { Header, Page, PageControls, PageContent, Button } from '@ui.packages/kit';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from './Table';

import styles from './default.module.scss';

import { selectInProcess } from '../ducks/slice';


function Units() {
  const dispatch = useDispatch();
  const inProcess = useSelector(selectInProcess);

  function handleCreate() {
    dispatch(openDialog('unit'));
  }

  return (
    <Page inProcess={inProcess}>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_CREATE}
            disabled={inProcess}
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
