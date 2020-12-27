
import React from 'react';
import {Link} from "react-router-dom";

import styles from "./default.module.scss";


function Empty() {
  return (
    <div className={styles['empty']}>
      <p className={styles['message']}>Нет выбранных товаров</p>
      <p className={styles['description']}>Перейти в раздел <Link className={styles['link']} to="/products">Витрина</Link></p>
    </div>
  );
}

export default Empty;
