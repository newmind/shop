
import types from "prop-types";
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    sphRight: types.string,
    sphLeft: types.string,
    cylRight: types.string,
    cylLeft: types.string,
    axisRight: types.string,
    axisLeft: types.string,
    addRight: types.string,
    addLeft: types.string,
  };

  render() {
    const { index, coating, design, type } = this.props;
    return (
      <div className={styles['lens']}>
        {index && (
          <div className={styles['lens__item']}>
            <div className={styles['lens__label']}>Индекс:</div>
            <div className={styles['lens__value']}>{ index['value'] }</div>
          </div>)}
        {coating && (
          <div className={styles['lens__item']}>
            <div className={styles['lens__label']}>Покрытие:</div>
            <div className={styles['lens__value']}>{ coating['value'] }</div>
          </div>)}
        {design && (
          <div className={styles['lens__item']}>
            <div className={styles['lens__label']}>Дизайн:</div>
            <div className={styles['lens__value']}>{ design['value'] }</div>
          </div>)}
        {type && (
          <div className={styles['lens__item']}>
            <div className={styles['lens__label']}>Тип:</div>
            <div className={styles['lens__value']}>{ type['value'] }</div>
          </div>)}
      </div>
    );
  }
}

export default Component;
