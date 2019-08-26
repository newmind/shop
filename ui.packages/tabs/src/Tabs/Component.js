
import types from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './defaults.module.scss';


class Component extends PureComponent {
  static propTypes = {
    name: types.string,
    defaultTab: types.string,
    createTabs: types.func,
    onChange: types.func,
  };

  static childContextTypes = {
    tabsName: types.string,
    onChange: types.func,
  };

  static defaultProps = {
    name: 'default',
    defaultTab: '',
  };

  getChildContext() {
    const { name } = this.props;
    return {
      tabsName: name,
      onChange: this._handleChangeTab.bind(this)
    };
  }

  componentWillMount() {
    const { name, defaultTab, createTabs } = this.props;
    createTabs(name, defaultTab);
  }

  componentDidUpdate(prevProps) {
    const { name, defaultTab, setActiveTab } = prevProps;
    if (this.props['defaultTab'] !== defaultTab) {
      setActiveTab(name, this.props['defaultTab']);
    }
  }

  componentWillUnmount() {
    const { name, removeTabs } = this.props;
    removeTabs(name);
  }

  _handleChangeTab(name) {
    const { onChange } = this.props;
    onChange && onChange(name);
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
