
import { Header } from '@ui.packages/kit';

import React from 'react';
import types from 'prop-types';

import Section from './Section';

import styles from './default.module.scss';


export default function Categories({ items }) {
  return (
    <div className={styles['wrapper']}>
      <header className={styles['header']}>
        <Header level={1}>Выберите интересующую вас категорию</Header>
      </header>
      <div className={styles['content']}>
        <div className={styles['container']}>
          {items.map((item, index) => (
            <Section key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

Categories.propTypes = {
  items: types.array,
};

Categories.defaultProps = {
  items: [],
};
