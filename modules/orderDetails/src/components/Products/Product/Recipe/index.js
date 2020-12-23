
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
    const { sphRight, sphLeft, cylRight, cylLeft, axisRight, axisLeft, addRight, addLeft } = this.props;
    return (
      <div className={styles['recipe']}>
        <div className={styles['recipe__line']}>
          <div className={styles['recipe__label']} />
          <div className={styles['recipe__value']}>SPH</div>
          <div className={styles['recipe__value']}>CYL</div>
          <div className={styles['recipe__value']}>AXIS</div>
          <div className={styles['recipe__value']}>ADD</div>
        </div>
        <div className={styles['recipe__line']}>
          <div className={styles['recipe__label']}>OD</div>
          <div className={styles['recipe__value']}>{ sphRight }</div>
          <div className={styles['recipe__value']}>{ cylRight }</div>
          <div className={styles['recipe__value']}>{ axisRight }</div>
          <div className={styles['recipe__value']}>{ addRight }</div>
        </div>
        <div className={styles['recipe__line']}>
          <div className={styles['recipe__label']}>OS</div>
          <div className={styles['recipe__value']}>{ sphLeft }</div>
          <div className={styles['recipe__value']}>{ cylLeft }</div>
          <div className={styles['recipe__value']}>{ axisLeft }</div>
          <div className={styles['recipe__value']}>{ addLeft }</div>
        </div>
      </div>
    );
  }
}

export default Component;
