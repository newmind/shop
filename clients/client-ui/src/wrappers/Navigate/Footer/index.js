
import { Logotype } from '@ui.packages/kit';

import React from 'react';

import Pay from "./Pay";
import Social from "./Social";
import Phones from "./Phones";
import Company from "./Company";

import styles from './default.module.scss';


function Footer() {
  return (
    <div className={styles['footer']}>
      <div className={styles['logotype']}>
        <Logotype />
      </div>
      <div className={styles['company']}>
        <Company />
      </div>
      <div className={styles['pay']}>
        <Pay />
      </div>
      <div className={styles['contacts']}>
        <Phones />
      </div>
      <div className={styles['social']}>
        <Social />
      </div>
    </div>
  );
}

export default Footer;
