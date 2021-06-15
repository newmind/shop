
import { selectUuid } from "@ui.packages/cart-widget";
import { Text, Radio, RadioBox } from '@ui.packages/kit';

import React from 'react';
import types from 'prop-types';
import {useSelector} from "react-redux";

import cn from 'classnames';
import styles from './default.module.scss';


function Option({ name, vendor, selected, onClick}) {
  const cart = useSelector(selectUuid);

  const products = cart.filter((item) => item[2]['vendor'] === vendor);
  const count = products.reduce((acc, item) => acc + item[1], 0);

  const optionClassName = cn(styles['option'], {
    [styles['option--select']]: selected
  });

  return (
    <div className={optionClassName} onClick={onClick}>
      <span className={styles['name']}>{ name }</span>
      {/*<span className={styles['vendor']}>{ vendor }</span>*/}
      { !! count && (
        <div className={styles['process']}>
          <span className={cn(styles['cart'], "fas fa-shopping-cart", { [styles['cart--no-empty']]: !! count })} />
          <span className={styles['count']}>{ count } шт.</span>
        </div>
      )}
    </div>
  );
}

function Options({ value, items, onChange }) {
  function handleChange(id) {
    if (onChange) {
      onChange(items.find(item => item['id'] === id));
    }
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Text type={Text.TYPE_BODY}>Комплектация:</Text>
      </div>
      <div className={styles['content']}>
        <RadioBox value={value} onChange={(id) => handleChange(id)}>
          {items.map((item, index) => (
            <Radio key={index} name={item['id']}>
              <Option {...item} />
            </Radio>
          ))}
        </RadioBox>
      </div>
    </div>
  );
}

Options.propTypes = {
  items: types.array,
  onChange: types.func,
};

Options.defaultProps = {
  items: [],
};

export default Options;
