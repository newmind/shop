
import { RadioBoxField, Radio } from "@ui.packages/kit";

import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import cn from 'classnames';
import styles from './default.module.scss';


function Block({ children, selected, onClick }) {
  const classNameBlock = cn(styles['block'], {
    [styles['block--selected']]: selected,
  });

  return (
    <div className={classNameBlock} onClick={onClick}>
      { children }
    </div>
  );
}

function Pay() {
  return (
    <RadioBoxField name="pay" defaultValue="post">
      <Radio name="cash">
        <Block>
          <i className={cn(styles['block__icon'], 'fas fa-cash-register')} />
          <span className={styles['block__caption']}>Онлайн оплата</span>
        </Block>
      </Radio>
      {/*{(formValues['delivery'] === 'courier')*/}
      {/*  ? (*/}
      {/*    <Radio name="courier-card" label="Оплата картой при получении товара">*/}
      {/*      <Block>*/}
      {/*        <i className={cn(styles['block__icon'], 'far fa-credit-card')} />*/}
      {/*        <span className={styles['block__caption']}>Оплата картой при<br />получении товара</span>*/}
      {/*      </Block>*/}
      {/*    </Radio>*/}
      {/*  )*/}
      {/*  : null}*/}
      {/*{(formValues['delivery'] === 'courier')*/}
      {/*  ? (*/}
      {/*    <Radio name="courier-cash" label="Оплата наличными при получении товара">*/}
      {/*      <Block>*/}
      {/*        <i className={cn(styles['block__icon'], 'far fa-money-bill-alt')} />*/}
      {/*        <span className={styles['block__caption']}>Оплата наличными при<br/>получении товара</span>*/}
      {/*      </Block>*/}
      {/*    </Radio>*/}
      {/*  )*/}
      {/*  : null}*/}
    </RadioBoxField>
  );
}


const mapStateToProps = (state) => {
  return {
    formValues: getFormValues('order')(state),
  };
};

export default connect(
  mapStateToProps,
)(Pay);
