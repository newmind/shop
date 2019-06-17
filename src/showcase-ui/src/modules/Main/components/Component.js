
// import types from 'prop-types';
import React, { PureComponent } from 'react';

// import numeral from '@packages/numeral';

// import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    return (
      <div className={styles['wrapper']}>
        <h2>Главная страница</h2>
      </div>
    );
  }
}

export default Component;
