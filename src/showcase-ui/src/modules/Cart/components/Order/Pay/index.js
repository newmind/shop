
import React, { PureComponent } from 'react';

import { Tab, Tabs } from "@ui.packages/tabs";


class Component extends PureComponent {
  render() {
    return (
      <Tabs name="pay" defaultTab="online">
        <Tab name="online" caption="Оплата онлайн"/>
        <Tab name="courier" caption="Наличными курьеру"/>
      </Tabs>
    );
  }
}

export default Component;
