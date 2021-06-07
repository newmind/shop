
import { Text } from '@ui.packages/kit';
import { Dialog } from "@ui.packages/dialog";

import React from 'react';
import { useSelector } from 'react-redux';

import { selectTypes } from '../ducks/slice';

import Types from "./Types";
import ProductOptionsForm from './ProductOptionsForm';

import styles from './default.module.scss';


export default function Main() {
  const types = useSelector(selectTypes);

  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['promo']}>
          <div className={styles['gallery']}>

          </div>
          <div className={styles['promotions']}>
            <Text type={Text.TYPE_BODY} theme={'light'}>Тут будет информация о<br/>скидках или распродажах</Text>
          </div>
        </div>
        <div className={styles['products']}>
          {types.map((item) => <Types key={item['id']} {...item} />)}
        </div>
      </div>

      <Dialog name={'fast-view'}>
        <ProductOptionsForm />
      </Dialog>
    </section>
  );
}
