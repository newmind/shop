
import { Header } from '@ui.packages/kit';

import React from 'react';

import Table from './Table';

import styles from './default.module.scss';


function Types() {
   return (
    <section className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={2}>Тип продукта</Header>
      </div>
      <article className={styles['block__content']}>
        <Table />
      </article>
    </section>
  );
}

Types.propTypes = {};

Types.defaultProps = {};

export default Types;
