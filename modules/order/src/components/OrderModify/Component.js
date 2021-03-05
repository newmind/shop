
import numeral from "@packages/numeral";
import { Mode, Size } from '@ui.packages/types';
import { createCancelToken } from '@ui.packages/request';
import { Button, Header, Text, Link } from "@ui.packages/kit";
import { selectAmount, selectUuid, selectItems, getCart } from '@ui.packages/cart-widget';

import React, { useEffect } from 'react';
import { FieldArray } from "redux-form";
import { useSelector, useDispatch } from 'react-redux';

import Products from './Products';
import Details from './Details';

import styles from "./default.module.scss";


function OrderModify({ handleSubmit }) {
  const dispatch = useDispatch();
  const uuid = useSelector(selectUuid);
  const amounts = useSelector(selectAmount);

  useEffect(function() {
    const token = createCancelToken();
    dispatch(getCart(uuid, token));
    return () => {
      token.cancel();
    };
  }, []);

  return (
    <div className={styles['wrapper']}>
      <form onSubmit={handleSubmit}>
        <div className={styles['section']}>
          <div className={styles['header']}>
            <Header theme="light" level={3}>Выбранные товары</Header>
          </div>
          <div className={styles['content']}>
            <FieldArray name="items" component={Products} />
          </div>
        </div>
        <div className={styles['section']}>
          <div className={styles['header']}>
            <Header theme="light" level={3}>Оформление заказа</Header>
          </div>
          <div className={styles['content']}>
            <Details />
          </div>
        </div>
        <div className={styles['controls']}>
          <div className={styles['information']}>
            <Text theme="light">Нажимая на кнопку ”Оформить заказ”, Вы подтверждаете согласие на обработку <Link href="/offer">Персональных данных</Link></Text>
            <Text theme="light">Для возврата или замены товара, ознакомтесь с информацией в разделе <Link href="/produce">Информация для Вас</Link></Text>
          </div>
          <div className={styles['buttons']}>
            { !! amounts.length && (
              <Button
                type={Button.TYPE_SUBMIT}
                mode={Mode.SUCCESS}
                size={Size.LARGE}
              >Оформить заказ на сумму { amounts.map((amount) => numeral(amount[1]).format() + ' ' + amount[2])}</Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default OrderModify;
