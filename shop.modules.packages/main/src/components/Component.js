
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <section className={styles['wrapper']}>
        <div className={styles['content']}>
          <p>Привет! Я главная страница</p>
        </div>
      </section>
    );
  }
}

export default Component;
