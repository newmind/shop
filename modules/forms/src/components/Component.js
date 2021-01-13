
import { Header } from '@ui.packages/kit';

import React from 'react';

import Table from './Table';

import styles from './default.module.scss';


function Forms() {
   return (
    <section className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={1}>Форма продукта</Header>
      </div>
      <article className={styles['content']}>
        <Table />
      </article>
    </section>
  );
}

Forms.propTypes = {};

Forms.defaultProps = {};

export default Forms;
