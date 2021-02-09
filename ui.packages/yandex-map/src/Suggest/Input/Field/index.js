
import { Input } from '@ui.packages/kit';

import React from 'react';

import styles from './defaults.module.scss';


function Field({ label, error, input }) {
  return (
    <div className={styles['wrapper']}>
      {label && (
        <p className={styles['label']}>{ label }</p>
      )}
      <div className={styles['content']}>
        <Input {...input} />
        {error && (
          <span className={styles['error']}>
            <span className={styles['error__message']}>{ error }</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default Field;
