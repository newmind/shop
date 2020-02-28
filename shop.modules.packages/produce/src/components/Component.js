
import React, { PureComponent } from 'react';

import styles from "./default.module.scss";


class Component extends PureComponent {
  render() {
    return (
      <section className={styles['wrapper']}>
        <div className={styles['content']}>
          <p>Сервис и поддержка</p>
        </div>
      </section>
    );
  }
}

export default Component;
