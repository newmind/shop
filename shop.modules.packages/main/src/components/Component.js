
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <section className={styles['wrapper']}>
        <p>Привет! Я главная страница</p>
      </section>
    );
  }
}

export default Component;
