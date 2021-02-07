
import { Mode } from "@ui.packages/types";
import { Page, PageContent, PageControls, Header, Button, Paging } from "@ui.packages/kit";

import React from 'react';
import { useSelector } from "react-redux";

import Table from './Table';

import styles from './default.module.scss';
import { selectMeta } from "../ducks/slice";


function Operations() {
  const meta = useSelector(selectMeta);

  return (
    <Page>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            mode={Mode.PRIMARY}
            form={Button.FORM_CONTEXT}
          >Добавить заказ</Button>
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
