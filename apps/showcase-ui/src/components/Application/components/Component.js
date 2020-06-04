
import { Notifications } from '@ui.packages/notifications';

import types from 'prop-types';
import { Route, Switch } from "react-router";
import React, { lazy, Suspense, PureComponent } from 'react';

import styles from './default.module.scss';


const Error = lazy(() => import(/* webpackChunkName: "application.loader" */'../../Error'));
const Loader = lazy(() => import(/* webpackChunkName: "application.loader" */'../../Loader'));
const Module = lazy(() => import(/* webpackChunkName: "application.module" */'../../Module/components'));


const Routes = props => {
  const { routes, navigate } = props;
  return (
    <Suspense fallback={null}>
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route
              exact
              key={index}
              path={route['path']}
              render={props => (
                <Module
                  navigate={navigate}
                  removable={route['removable']}
                  wrapper={route['wrapper']}
                  module={route['module']}
                  {...props}
                />
              )}
            />
          );
        })}
        <Route path="*" render={(props) => (
          <Module
            wrapper="Empty"
            module={import(
              /* webpackChunkName: "not-found" */
              '@modules.packages/not-found2'
            )}
            {...props}
          />
        )} />
      </Switch>
    </Suspense>
  );
};


class Component extends PureComponent {
  static propTypes = {
    routes: types.array,
    navigate: types.array,
    isInit: types.bool,
    profile: types.object,
    changeState: types.func,
    getProfile: types.func,
  };

  static defaultProps = {
    routes: [],
    isInit: false,
    isAuth: false,
    profile: {},
  };

  static childContextTypes = {
    navigate: types.array,
    profile: types.object,
    isAuth: types.bool,
    signIn: types.func,
    signOut: types.func,
    onNavLink: types.func,
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error,
    };
  };

  getChildContext() {
    const { profile, isAuth, signIn, signOut, navigate } = this.props;
    return {
      navigate,
      profile,
      isAuth,
      signIn,
      signOut,
    };
  }

  state = {
    hasError: false,
    error: null,
  };

  async componentDidMount() {
    const { changeState } = this.props;
    changeState(true);
  }

  render() {
    const { hasError, error } = this.state;
    const { isInit, ...props } = this.props;

    return (
      <Suspense fallback={null}>
        <div className={styles['wrapper']}>
          {isInit
            ? ( ! hasError
              ? <Routes {...props} />
              : <Error error={error} />)
            : <Loader />}
          <Notifications/>
        </div>
      </Suspense>
    );
  }
}

export default Component;
