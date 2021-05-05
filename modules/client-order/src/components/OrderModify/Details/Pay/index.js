
import { RadioBoxField, Radio, Text } from "@ui.packages/kit";

import React from 'react';
import { useSelector } from 'react-redux';
import { getFormValues } from 'redux-form';

import cn from 'classnames';
import styles from './default.module.scss';

import { selectPayments } from '../../../../ducks/slice';


function Block({ children, selected, disabled, onClick }) {
  const classNameBlock = cn(styles['block'], {
    [styles['block--selected']]: selected,
  }, {
    [styles['disabled']]: disabled
  });

  function handleClick() {
    if ( ! disabled) {
      onClick();
    }
  }

  return (
    <div className={classNameBlock} onClick={() => handleClick()}>
      { children }
    </div>
  );
}

function Pay() {
  const payments = useSelector(selectPayments);
  const formValues = useSelector(getFormValues('order'));

  return (
    <div className={styles['wrapper']}>
      <div className={styles['controls']}>
        <RadioBoxField className={styles['radio']} name="payment" defaultValue="post">
          {payments.map((payment, index) => (
            <Radio key={index} name={payment['code']}>
              <Block>
                <span className={styles['block__caption']}>{ payment['name'] }</span>
              </Block>
            </Radio>
          ))}
        </RadioBoxField>
      </div>
      <div className={styles['content']}>
        {(formValues['payment'] === 'delivery') && (
          <Text>Выбирая этот способ оплаты, вы можите оплатить товар при получении, как наличными так и банковской картой</Text>
        )}
        {(formValues['payment'] === 'online') && (
          <Text>Выбирая этот способ, вы можите оплатить товар заранее используя платежную систему pikassa</Text>
        )}
      </div>
    </div>
  );
}

export default Pay;
