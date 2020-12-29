
import { Header } from '@ui.packages/kit';

import React from 'react';

import Section from './Section';

import styles from './default.module.scss';


function Types({ items } ) {
  return (
    <section className={styles['wrapper']}>
      <header className={styles['header']}>
        <Header level={1}>Какой тип товара Вас интересует?</Header>
      </header>
      <div className={styles['content']}>
        <div className={styles['container']}>
          {items.map((item, index) => (
            <Section key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Types;
