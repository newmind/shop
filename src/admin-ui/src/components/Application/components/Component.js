
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Route, Switch } from "react-router";

import { Notifications } from '@packages/notifications';

import Loader from '../../Loader';
import Module from '../../Module';

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
    routes: PropTypes.array,
    navigate: PropTypes.array,
    isInitializing: PropTypes.bool,
    authenticated: PropTypes.bool,
  };

  static defaultProps = {
    routes: [],
    navigate: [],
    isInitializing: true,
  };

  componentWillMount() {
    // if (!this.props.authenticated) {
    //   this.props.history.push('/sign-in');
    // }
  }

  componentDidMount() {
    const { checkAuthState } = this.props;
    checkAuthState();
  }

  render() {
    const { isInitializing, ...props } = this.props;
    return (
      <div className={styles['wrapper']}>
        {
          isInitializing
            ? <Loader />
            : <Routes {...props} />
        }
        <Notifications />
      </div>
    );
  }
}

export default Component;
