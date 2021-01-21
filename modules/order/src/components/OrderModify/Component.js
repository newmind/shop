
import numeral from "@packages/numeral";

import { Mode, Size } from '@ui.packages/types';
import { selectItems } from '@ui.packages/cart';
import { Button, Header, Text, Link } from "@ui.packages/kit";

import React from 'react';
import types from "prop-types";
import { FieldArray } from "redux-form";
import { useSelector } from 'react-redux';

import Products from './Products';
import Details from './Details';

// import cn from 'classnames';
import styles from "./default.module.scss";


const calculateFullAmount = (products) => {
  let fullAmount = 0;
  for (let index in products) {
    if (products.hasOwnProperty(index)) {
      const product = products[index];
      fullAmount += product['amount'];
      if ('lens' in product) {
        const lens = product['lens'];
        for (let key in lens) {
          if (lens.hasOwnProperty(key)) {
            const position = lens[key];
            if (position) {
              fullAmount += position['coast'];
            }
          }
        }
      }
    }
  }
  return fullAmount;
};

export default function OrderModify({ handleSubmit }) {
  const items = useSelector(selectItems);

  return (
    <div className={styles['wrapper']}>
      <form onSubmit={handleSubmit}>
        <div className={styles['section']}>
          <div className={styles['header']}>
            <Header level={3}>Выбранные товары</Header>
          </div>
          <div className={styles['content']}>
            <FieldArray name="items" component={Products} />
          </div>
        </div>
        <div className={styles['section']}>
          <div className={styles['header']}>
            <Header level={3}>Оформление заказа</Header>
          </div>
          <div className={styles['content']}>
            <Details />
          </div>
        </div>
        <div className={styles['controls']}>
          <div className={styles['information']}>
            <Text>Нажимая на кнопку ”Оформить заказ”, Вы подтверждаете согласие на обработку <Link href="/offer">Персональных данных</Link></Text>
            <Text>Для возврата или замены товара, ознакомтесь с информацией в разделе <Link href="/produce">Информация для Вас</Link></Text>
          </div>
          <div className={styles['buttons']}>
            <Button
              type={Button.TYPE_SUBMIT}
              mode={Mode.SUCCESS}
              size={Size.LARGE}
            >Оформить заказ на сумму { numeral(calculateFullAmount(items)).format() } руб.</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

OrderModify.propTypes = {
  externalId: types.string,
  paymentLink: types.string,
};

OrderModify.defaultProps = {

};
