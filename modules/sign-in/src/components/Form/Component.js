
import { Mode } from '@ui.packages/types';
import { InputField, Header, Button } from '@ui.packages/kit'

import React from 'react';

import styles from "./default.module.scss";


function Form({ handleSubmit }) {
  return (
    <form className={styles['dialog']} onSubmit={handleSubmit}>
      <div className={styles['header']}>
        <Header level={4}>Вход в личный кабинет</Header>
      </div>
      <div className={styles['content']}>
        <div className={styles['row']}>
          <InputField name="login" label="Логин" />
        </div>
        <div className={styles['row']}>
          <InputField name="password" label="Пароль" type="password" />
        </div>
      </div>
      <div className={styles['controls']}>
        <Button
          type={Button.TYPE_SUBMIT}
          mode={Mode.PRIMARY}
          disabled={false}
        >Войти в кабинет</Button>
      </div>
    </form>
  );
}

export default Form;
