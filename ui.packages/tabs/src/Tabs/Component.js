
import types from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './defaults.module.scss';


class Component extends PureComponent {
  static propTypes = {
    name: types.string,
    defaultTab: types.string,
    createTabs: types.func,
  };

  static childContextTypes = {
    tabsName: types.string,
  };

  static defaultProps = {
    name: 'default',
    defaultTab: '',
  };

  getChildContext() {
    const { name } = this.props;
    return {
      tabsName: name,
    };
  }

  componentWillMount() {
    const { name, defaultTab, createTabs } = this.props;
    createTabs(name, defaultTab);
  }

  componentWillUnmount() {
    const { name, removeTabs } = this.props;
    removeTabs(name);
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles['wrapper']}>
        { children }
      </div>
    );
  }
}

export default Component;
