
import { Button } from '@ui.packages/kit';
import { ApplicationContext } from '@ui.packages/application';

import types from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useContext } from 'react';

import Form from './Form';

import styles from './default.module.scss';


function SignIn({ isValid, isPristine, submit }) {
  const navigate = useNavigate();
  const { isAuth, signIn } = useContext(ApplicationContext);

  useEffect(function init() {
    if (isAuth) {
      navigate(process.env['PUBLIC_URL'] + '/');
    }
  }, []);

  async function onSubmit(data) {
    const isSuccess = await signIn(data);
    if (isSuccess) {
      navigate(process.env['PUBLIC_URL'] + '/');
    }
  }

  function onSubmitForm() {
    submit('sign-in');
  }

  return (
    <div className="page">
      <div className={styles['wrapper']}>
        <div className={styles['dialog']}>
          <h2 className={styles['header']}>Авторизация</h2>
          <div className={styles['dialog__content']}>
            <Form onSubmit={(data) => onSubmit(data)} />
          </div>
          <div className={styles['dialog__controls']}>
            <Button
              mode="success"
              disabled={ ! isValid || isPristine}
              onClick={() => onSubmitForm()}>Выполнить</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

SignIn.propTypes = {
  isValid: types.bool,
  isPristine: types.bool,
  push: types.func,
};

SignIn.defaultProps = {
  isValid: false,
  isPristine: false,
};

export default SignIn;
