
import { Suggest } from '@ui.packages/yandex-map';
import { RadioBoxField, Radio } from "@ui.packages/kit";

import React from 'react';
import { useSelector } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';

import { selectDeliveries } from '../../../../ducks/slice';


function Block({ children, selected, onClick }) {
  const classNameBlock = cn(styles['block'], {
    [styles['block--selected']]: selected,
  });

  return (
    <div className={classNameBlock} onClick={onClick}>
      { children }
    </div>
  );
}


function Delivery() {
  const deliveries = useSelector(selectDeliveries);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['controls']}>
        <RadioBoxField className={styles['radio']} name="delivery" defaultValue="post">
          {deliveries.map((delivery, index) => (
            <Radio key={index} name={delivery['code']}>
              <Block>
                <span className={styles['block__caption']}>{ delivery['name'] }</span>
              </Block>
            </Radio>
          ))}
        </RadioBoxField>
      </div>
      <div className={styles['content']}>
        <Suggest
          name="address"
          label="Адрес доставки"
        />
      </div>
    </div>
  );
}

export default Delivery;
