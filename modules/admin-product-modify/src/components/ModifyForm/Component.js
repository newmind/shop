
import React from 'react';

import Shops from './Shops';
import Common from './Common';
import Characteristics from './Characteristics';
import Gallery from './Gallery';
import Options from './Options';
import Promotions from './Promotions';

import styles from './default.module.scss';


function ModifyForm({ handleSubmit }) {
  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <div className={styles['section']}>
          <Shops />
        </div>
        <div className={styles['section']}>
          <Common />
        </div>
        <div className={styles['section']}>
          <Gallery />
        </div>
        <div className={styles['section']}>
          <Characteristics />
        </div>
        <div className={styles['section']}>
          <Options />
        </div>
        <div className={styles['section']}>
          <Promotions />
        </div>
      </div>
    </form>
  );
}

export default ModifyForm;
