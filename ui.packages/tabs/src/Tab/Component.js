
import types from 'prop-types';
import React, { useContext } from "react";

import Context from '../contexts/TabContext';

import cn from 'classnames';
import styles from "./defaults.module.scss";


function Tab({ name, setActiveTab, tabs, caption, count, children }) {
  const { tabsName, onChange } = useContext(Context);

  function handleSetActiveTab() {
    onChange(name);
    setActiveTab(tabsName, name)
  }

  const activeTab = tabs[tabsName] && tabs[tabsName]['activeTab'];
  const classNameTab = cn(styles['tab'], {
    [styles['tab--active']]: (activeTab === name),
  });

  return (
    <span className={classNameTab} onClick={handleSetActiveTab}>
      <span className={styles['tab__caption']}>
        <span className={styles['text']}>{ children || caption }</span>
        {count && <span className={styles['count']}>{ count }</span>}
      </span>
    </span>
  );
}

Tab.propTypes = {
  caption: types.string,
  name: types.string,
  count: types.number,
  tabs: types.object.isRequired,
  setActiveTab: types.func,
};

Tab.defaultProps = {
  caption: 'No caption',
  name: '',
  count: null,
  tabs: {},
};

export default Tab;
