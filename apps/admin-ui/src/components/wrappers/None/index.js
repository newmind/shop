
import React, { PureComponent } from 'react';

import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <section className={styles['wrapper']}>
        <section className={styles['content']}>
          { children }
        </section>
      </section>
    );
  }
}

export default Component;
