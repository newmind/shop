
import React, { PureComponent } from 'react';

import { RadioBoxField, Radio } from "@ui.packages/ui";

import cn from 'classnames';
import styles from './default.module.scss';


class Block extends PureComponent {
  render() {
    const { children, selected, onClick } = this.props;
    const classNameBlock = cn(styles['block'], {
      [styles['block--selected']]: selected,
    });
    return (
      <div className={classNameBlock} onClick={onClick}>
        { children }
      </div>
    );
  }
}

class Component extends PureComponent {
  render() {
    return (
      <RadioBoxField name="pay" defaultValue="post">
        <Radio name="cash">
          <Block>
            <i className={cn(styles['block__icon'], 'fas fa-cash-register')} />
            <span className={styles['block__caption']}>Онлайн оплата</span>
          </Block>
        </Radio>
        <Radio name="courier" label="Оплата при получении товара">
          <Block>
            <i className={cn(styles['block__icon'], 'fas fa-money-check-alt')} />
            <span className={styles['block__caption']}>Оплата при получении<br/>товара</span>
          </Block>
        </Radio>
      </RadioBoxField>
    );
  }
}

export default Component;