
import React, { useEffect } from 'react';

import TabContext from "../contexts/TabContext";

import styles from './defaults.module.scss';


function Tabs({ name, defaultTab, children, createTabs, removeTabs, setActiveTab, onChange }) {
  function handleChangeTab(name) {
    onChange && onChange(name);
  }

  useEffect(() => {
    createTabs(name, defaultTab);
    return () => {
      removeTabs(name);
    };
  });

  useEffect(() => {
    setActiveTab(name);
  }, [ defaultTab ]);

  return (
    <TabContext.Provider value={{
      tabsName: name,
      onChange: (name) => handleChangeTab(name),
    }}>
      <div className={styles['wrapper']}>
        { children }
      </div>
    </TabContext.Provider>
  );
}

export default Tabs;
