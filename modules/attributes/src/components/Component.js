
import { openDialog } from "@ui.packages/dialog";
import { Header, Page, PageControls, PageContent, Button } from '@ui.packages/kit';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from './Table';

import styles from './default.module.scss';

import { selectInProcess } from '../ducks/slice';


function Attributes() {
  const dispatch = useDispatch();
  const inProcess = useSelector(selectInProcess);

  function handleCreate() {
    dispatch(openDialog('attribute'));
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
          <div className={styles['header']}>
            <Header level={1}>Аттрибуты продукта</Header>
          </div>
          <article className={styles['content']}>
            <Table />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}



Attributes.propTypes = {};

Attributes.defaultProps = {};

export default Attributes;
