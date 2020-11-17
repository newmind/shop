
import types from 'prop-types';
import React, { useEffect, useRef } from 'react';

import TabContext from "../contexts/TabContext";

import styles from './defaults.module.scss';


const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


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
  }, [defaultTab]);

  return (
    <TabContext.Provider value={{
      tabsName: name,
      onChange: handleChangeTab
    }}>
      <div className={styles['wrapper']}>
        { children }
      </div>
    </TabContext.Provider>
  );
}

export default Tabs;
