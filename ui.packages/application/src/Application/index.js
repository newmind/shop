
import React from 'react';
import { useSelector } from 'react-redux';

import Router from '../Router';
import Loading from '../Loading';

import { useGetProfile } from '../hooks';
import ApplicationContext from "../Context";

import { selectIsLoaded } from '../ducks/slice';

import styles from './default.module.scss';


function Application({ options }) {
  const isLoaded = useSelector(selectIsLoaded);

  useGetProfile();

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
