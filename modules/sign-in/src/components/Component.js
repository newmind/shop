
import { ApplicationContext } from '@ui.packages/application';

import types from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useContext } from 'react';

import Form from './Form';

import styles from './default.module.scss';


function SignIn() {
  const navigate = useNavigate();
  const { isAuth, signIn } = useContext(ApplicationContext);

  useEffect(function init() {
    if (isAuth) {
      navigate(process.env['PUBLIC_URL'] + '/');
    }
  }, []);

  async function handleSignIn(data) {
    const isSuccess = await signIn(data);
    if (isSuccess) {
      navigate(process.env['PUBLIC_URL'] + '/');
    }
  }

  return (
    <div className={styles['wrapper']}>
      <Form onSubmit={(data) => handleSignIn(data)} />
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
