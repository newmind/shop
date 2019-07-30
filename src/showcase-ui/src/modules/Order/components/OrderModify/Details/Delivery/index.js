
import React, { PureComponent } from 'react';

import { RadioBoxField, Radio } from "@ui.packages/ui";


class Component extends PureComponent {
  render() {
    return (
      <RadioBoxField name="delivery" defaultValue="post">
        <Radio name="post" label="Доставка по почте" />
        <Radio name="courier" label="Доставка курьером" />
      </RadioBoxField>
    );
  }
}

export default Component;
