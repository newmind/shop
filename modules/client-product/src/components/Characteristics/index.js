
import { Header, Text } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from "react-redux";

import Attributes from "./Attributes";

import styles from './default.module.scss';

import { selectProduct } from "../../ducks/slice";


function Characteristics() {
  const product = useSelector(selectProduct);

  if ( ! product['characteristics'].length) {
    return (
      <div className={styles['characteristics']}>
        <Text theme={'light'} type={Text.TYPE_BODY}>У продукта нет харктеристик</Text>
      </div>
    );
  }

  return (
    <div className={styles['characteristics']}>
      {product['characteristics'].map((item, index) => (
        <div key={index} className={styles['characteristic']}>
          <div className={styles['title']}>
            <Header theme="light" level={3}>{ item['name'] }</Header>
          </div>
          <div className={styles['attributes']}>
            <Attributes key={index} items={item['attributes']} />
          </div>
        </div>
      ))}
    </div>
  );
}

Characteristics.propTypes = {};

Characteristics.defaultProps = {};


export default Characteristics;
