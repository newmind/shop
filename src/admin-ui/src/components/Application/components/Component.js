
import types from 'prop-types';
import React, { PureComponent } from 'react';
import { Route, Switch } from "react-router";

import { sleep } from '@ui.packages/utils';

import Loader from '../../Loader';
import Module from '../../Module/components';

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
      <Route path="*" render={props => <Module module="NotFound" removable={true} {...props} />} />
    </Switch>
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
    navigate: [],
    isInit: false,
    isAuth: false,
    profile: {},
  };

  static childContextTypes = {
    profile: types.object,
    isAuth: types.bool,
  };

  getChildContext() {
    const { profile, isAuth } = this.props;
    return {
      profile,
      isAuth,
    };
  }

  async componentDidMount() {
    const { changeState, getProfile } = this.props;
    await getProfile();
    await sleep(600);
    changeState(true);
  }

  render() {
    const { isInit, ...props } = this.props;
    return (
      <div className={styles['wrapper']}>
        {
          isInit
            ? <Routes {...props} />
            : <Loader />
        }
      </div>
    );
  }
}

export default Component;
