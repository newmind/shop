
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useMatch } from 'react-router-dom';

import Router from '../Router';
import Loading from '../Loading';
import ApplicationContext from "../contexts/ApplicationContext";

import { selectIsLoading, selectProfile, applicationHasLoadedAction } from '../ducks/slice';

import styles from './default.module.scss';


function Application({ options, isAuth, inProcess, signIn, signOut, getProfile }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const profile = useSelector(selectProfile);

  const isSignIn = useMatch('/sign-in');

  useEffect(async function init() {
    console.log('application mount');

    if (options['useSign']) {
      const isAuth = await getProfile();
      if ( ! isAuth) {
        navigate(process.env['PUBLIC_URL'] + '/sign-in');
      }
      else {
        if (isSignIn) {
          navigate(process.env['PUBLIC_URL'] + '/');
        }
      }
    }
    dispatch(applicationHasLoadedAction());
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
        profile,
        ...options,
      }}>
        {isLoading
          ? <Loading />
          : <Router />}
      </ApplicationContext.Provider>
    </section>
  );
}

export default Application;
