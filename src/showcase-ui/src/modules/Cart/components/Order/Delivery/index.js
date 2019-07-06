
import React, { PureComponent } from 'react';

import { Tab, TabContainer, Tabs } from "@packages/tabs";


class Component extends PureComponent {
  render() {
    return (
      <Tabs name="delivery" defaultTab="courier">
        <Tab name="courier" caption="Курьером"/>
        <Tab name="post" caption="По почте"/>
        <TabContainer to="courier">One</TabContainer>
        <TabContainer to="post">Two</TabContainer>
      </Tabs>
    );
  }
}

export default Component;
