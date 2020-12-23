
import { Button } from '@ui.packages/kit';

import React from 'react';

import styles from './default.module.scss';


function Profile() {
  return (
    <div className={styles['wrapper']}>
      <h2 className={styles['header']}>Можно зарегистрировать личный кабинет</h2>
      <div className={styles['content']}>
        <div className={styles['sign-up']}>
          <Button type="link" mode="success" href={process.env['PUBLIC_URL'] + '/sign-up'}>Регистрация</Button>
        </div>
        <div className={styles['description']}>
          <p className={styles['text']}>Мне навсегда запали в душу слова коллеги по цеху: “Ко мне как-то пришёл парень за помощью – продать 300 плюшевых негров, которых он купил оптом, но идея не пошла”.</p>
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
