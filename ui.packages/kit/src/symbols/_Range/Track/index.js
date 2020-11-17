
import numeral from '@packages/numeral';

import types from 'prop-types';
import React from 'react';

import styles from './default.module.scss';


function Track({ value, min, max }) {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['container']}>
        <span className={styles['min']}>{ numeral(min).format() } руб.</span>
        <span className={styles['value']}>{ numeral(value).format() } руб.</span>
        <span className={styles['max']}>{ numeral(max).format() } руб.</span>
      </div>
    </div>
  );
}

Track.propTypes = {
  onFocus: types.func,
  onChange: types.func,
  onBlur: types.func,
};

Track.defaultProps = {
  onFocus: null,
  onChange: null,
  onBlur: null,
};

export default Track;
