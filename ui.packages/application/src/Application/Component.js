
import React from 'react';

import Router from '../Router';

import styles from './default.module.scss';


function Application() {
  return (
    <section className={styles['application']}>
      <Router />
    </section>
  );
}

export default Application;
