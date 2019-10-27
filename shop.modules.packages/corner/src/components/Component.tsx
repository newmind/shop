
// @ts-ignore
import { TabContainer, Tabs, Tab } from '@ui.packages/tabs';

import React, { PureComponent } from 'react';

interface IProps {
  location: {
    hash: string
  },
}


class Component extends PureComponent<IProps> {
  render() {
    const { location: { hash }} = this.props;
    return (
      <div className="page">
        <Tabs name="corner" defaultTab={hash}>
          <Tab caption="HHHHH" name="#pay" />
          <Tab caption="jjjj" name="#return" />
          <TabContainer to="#pay">
            <p>Pay</p>
          </TabContainer>
          <TabContainer to="#return">
            <p>Return</p>
          </TabContainer>
        </Tabs>
      </div>
    );
  }
}

export default Component;
