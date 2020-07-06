
import { Notifications } from '@ui.packages/notifications';

import types from 'prop-types';
import { Route, Switch } from "react-router";
import React, { PureComponent } from 'react';

import Error from '../../Error';
import Loader from '../../Loader';
import Module from '../../Module/components';

import cn from 'classnames';
import styles from './default.module.scss';


const Routes = props => {
  const { routes, navigate } = props;

  return (
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
  );
};


class Component extends PureComponent {
  static displayName = 'Application';

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
    signDialog: types.func,
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error,
    };
  };

  getChildContext() {
    const { profile, isAuth, signIn, signOut, navigate, signDialog } = this.props;
    return {
      navigate,
      profile,
      isAuth,
      signIn,
      signOut,
      signDialog
    };
  }

  state = {
    hasError: false,
    error: null,
  };

  async componentDidMount() {
    const { changeState, getProfile } = this.props;

    await getProfile();
    changeState(true);
  }

  render() {
    const { hasError, error } = this.state;
    const { isInit, isMobile, isTablet, isDesktop, ...props } = this.props;

    const applicationWrapperClassName = cn(styles['wrapper'], {
      'mobile': isMobile,
      'tablet': isTablet,
      'desktop': isDesktop,
    });

    return (
      <div className={applicationWrapperClassName}>
        {isInit
          ? ( ! hasError
            ? <Routes {...props} />
            : <Error error={error} />)
          : <Loader />}
        <Notifications/>
      </div>
    );
  }
}

export default Component;
