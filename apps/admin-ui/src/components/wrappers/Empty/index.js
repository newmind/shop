
import React, { PureComponent } from 'react';

import Header from './Header';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <section className={styles['wrapper']}>
        <header className={styles['header']}>
          <Header />
        </header>
        <section className={styles['content']}>
          { children }
        </section>
      </section>
    );
  }
}

export default Component;
