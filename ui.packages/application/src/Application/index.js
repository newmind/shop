
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Router from '../Router';
import Loading from '../Loading';

import ApplicationContext from "../Context";
import { useGetProfile, useRedirect } from '../hooks';

import { isLoadedAction, selectIsLoaded } from '../ducks/slice';

import styles from './default.module.scss';


function Application({ options }) {
  const dispatch = useDispatch();
  const isLoaded = useSelector(selectIsLoaded);

  if (options['useSignIn']) {
    useRedirect();
    useGetProfile();
  }
  else {
    dispatch(isLoadedAction());
  }

  return (
    <section className={styles['application']}>
      <ApplicationContext.Provider value={{ ...options }}>
        {isLoaded
          ? <Router />
          : <Loading />}
      </ApplicationContext.Provider>
    </section>
  );
}

export default Application;
