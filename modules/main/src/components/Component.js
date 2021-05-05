
import React from 'react';
import { useSelector } from 'react-redux';

import { selectTypes } from '../ducks/slice';

import Types from "./Types";

import styles from './default.module.scss';


export default function Main() {
  const types = useSelector(selectTypes);

  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['promotions']}>

        </div>
        <div className={styles['products']}>
          {types.map((item) => <Types key={item['id']} {...item} />)}
        </div>
      </div>
    </section>
  );
}
