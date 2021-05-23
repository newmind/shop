
import { TabContainer, Tabs, Tab } from '@ui.packages/tabs'

import React from 'react';

import Common from './Common';
import Characteristics from './Characteristics';
import Gallery from './Gallery';
import Options from './Options';
import Promotions from './Promotions';

import cn from 'classnames';
import styles from './default.module.scss';


function TabLink({ isActive, children, onClick }) {
  return (
    <div className={cn(styles['link'], {
      [styles['link--active']]: isActive,
    })} onClick={onClick}>
      <span className={styles['caption']}>{ children }</span>
    </div>
  );
}

function ModifyForm({ handleSubmit }) {
  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <Tabs defaultTab={'common'}>
        <div className={styles['content']}>
          <div className={styles['section']}>
            <TabContainer to={'common'}>
              <Common />
            </TabContainer>
            <TabContainer to={'gallery'}>
              <Gallery />
            </TabContainer>
            <TabContainer to={'characteristics'}>
              <Characteristics />
            </TabContainer>
            <TabContainer to={'options'}>
              <Options />
            </TabContainer>
            <TabContainer to={'promotions'}>
              <Promotions />
            </TabContainer>
          </div>
          <div className={styles['aside']}>
            <Tab name={'common'} Component={TabLink}>Основные</Tab>
            <Tab name={'gallery'} Component={TabLink}>Галлерея</Tab>
            <Tab name={'characteristics'} Component={TabLink}>Характеристика</Tab>
            <Tab name={'options'} Component={TabLink}>Комплектация</Tab>
            <Tab name={'promotions'} Component={TabLink}>Акции</Tab>
          </div>
        </div>
      </Tabs>
    </form>
  );
}

export default ModifyForm;
