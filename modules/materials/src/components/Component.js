
import { Header } from '@ui.packages/kit';

import React from 'react';

import Table from './Table';

import styles from './default.module.scss';


function Materials() {
   return (
    <section className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={1}>Материал продукта</Header>
      </div>
      <article className={styles['content']}>
        <Table />
      </article>
    </section>
  );
}

Materials.propTypes = {};

Materials.defaultProps = {};

export default Materials;
