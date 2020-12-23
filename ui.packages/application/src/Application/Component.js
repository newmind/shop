
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Router from '../Router';
import ApplicationContext from "../contexts/ApplicationContext";

import styles from './default.module.scss';


function Application({ options, isAuth, inProcess, signIn, signOut, getProfile }) {
  const navigate = useNavigate();

  useEffect(async function init() {
    console.log('application mount')
    if (options['useSign']) {
      const isAuth = await getProfile();
      if ( ! isAuth) {
        navigate(process.env['PUBLIC_URL'] + '/sign-in');
      }
    }
    return () => {
      console.log('application unmount');
    }
  }, []);

  return (
    <section className={styles['application']}>
      <ApplicationContext.Provider value={{
        isAuth,
        inProcess,
        signIn,
        signOut,
        ...options,
      }}>
        <Router />
      </ApplicationContext.Provider>
    </section>
  );
}

export default Application;
