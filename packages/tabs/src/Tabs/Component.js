
import types from 'prop-types';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './defaults.module.scss';


class Component extends PureComponent {
  static propTypes = {
    name: types.string,
    defaultTab: types.string,
    createTabs: types.func,
  };

  static defaultProps = {
    name: 'default',
    defaultTab: '',
  };

  componentWillMount() {
    const { name, defaultTab, createTabs } = this.props;
    createTabs(name, defaultTab);
  }

  componentWillUnmount() {
    const { name, removeTabs } = this.props;
    removeTabs(name);
  }

  render() {
    const { name, children } = this.props;
    return (
      <div className={styles['wrapper']}>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            tabsName: name,
          })
        )}
      </div>
    );
  }
}

export default Component;
