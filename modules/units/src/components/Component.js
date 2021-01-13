
import { Header } from '@ui.packages/kit';

import React from 'react';

import Table from './Table';

import styles from './default.module.scss';


function Units() {
   return (
    <section className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={2}>Единицы измерения</Header>
      </div>
      <article className={styles['block__content']}>
        <Table />
      </article>
    </section>
  );
}

Units.propTypes = {};

Units.defaultProps = {};

export default Units;
