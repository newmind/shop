
import numeral from "@packages/numeral";
import { Mode, Size } from '@ui.packages/types';
import { selectAmount } from '@ui.packages/cart-widget';
import { Button, Header, Text, Link } from "@ui.packages/kit";

import React from 'react';
import { FieldArray, isValid, isPristine } from "redux-form";
import { useSelector } from 'react-redux';

import Products from './Products';
import Details from './Details';

import styles from "./default.module.scss";

import { selectInProcess } from '../../ducks/slice';


function OrderModify({ handleSubmit }) {
  const amounts = useSelector(selectAmount);
  const inProcess = useSelector(selectInProcess);
  const valid = useSelector(isValid('order'));
  const pristine = useSelector(isPristine('order'));

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
                disabled={inProcess || ! valid || pristine}
              >Оформить заказ на сумму { amounts.map((amount) => numeral(amount[1]).format() + ' ' + amount[2])}</Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default OrderModify;
