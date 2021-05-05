
import { Page, PageContent, PageControls, Header, Button, Paging } from "@ui.packages/kit";

import React from 'react';
import { useSelector } from "react-redux";

import Table from './Table';

import styles from './default.module.scss';

import { selectMeta, selectInProcess } from "../ducks/slice";


function Operations() {
  const meta = useSelector(selectMeta);
  const inProcess = useSelector(selectInProcess);

  return (
    <Page inProcess={inProcess}>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_CREATE}
            disabled={inProcess}
          >Добавить</Button>
        </div>
      </PageControls>
      <PageContent>
        <div className={styles['header']}>
          <Header level={1}>Заказы</Header>
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

export default Operations;
