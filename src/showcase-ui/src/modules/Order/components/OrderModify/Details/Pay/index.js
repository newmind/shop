
import React, { PureComponent } from 'react';

import { RadioBoxField, Radio } from "@ui.packages/ui";


class Component extends PureComponent {
  render() {
    return (
      <RadioBoxField name="pay" defaultValue="post">
        <Radio name="cash" label="Онлайн оплата" />
        <Radio name="courier" label="Оплата при получении товара" />
      </RadioBoxField>
    );
  }
}

export default Component;