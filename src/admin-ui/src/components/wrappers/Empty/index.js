
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <section className={styles['wrapper']}>
        <header className={styles['header']}>
          header
        </header>
        <section className={styles['content']}>
          { children }
        </section>
        <footer className={styles['footer']}>
          footer
        </footer>
      </section>
    );
  }
}

export default Component;
