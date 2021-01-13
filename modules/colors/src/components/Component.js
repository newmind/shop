
import { Header } from '@ui.packages/kit';

import React from 'react';

import Table from './Table';

import styles from './default.module.scss';


function Colors() {
   return (
    <section className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={1}>Цвет продукта</Header>
      </div>
      <article className={styles['content']}>
        <Table />
      </article>
    </section>
  );
}

Colors.propTypes = {};

Colors.defaultProps = {};

export default Colors;
