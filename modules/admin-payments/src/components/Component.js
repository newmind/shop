
import { selectInProcess } from '@modules/admin-payments';

import { Header, Page, PageContent } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';

import Table from './Table';

import styles from './default.module.scss';


function PaymentsPage() {
  const inProcess = useSelector(selectInProcess);

  return (
    <Page inProcess={inProcess}>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Способы оплаты</Header>
          </div>
          <article className={styles['content']}>
            <Table />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

PaymentsPage.propTypes = {};

PaymentsPage.defaultProps = {};

export default PaymentsPage;
