
import { RadioBoxField, Radio } from "@ui.packages/kit";

import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import cn from 'classnames';
import styles from './default.module.scss';


function Block({ children, selected, disabled, onClick }) {
  const classNameBlock = cn(styles['block'], {
    [styles['block--selected']]: selected,
  }, {
    [styles['disabled']]: disabled
  });

  function handleClick() {
    if ( ! disabled) {
      onClick();
    }
  }

  return (
    <div className={classNameBlock} onClick={() => handleClick()}>
      { children }
    </div>
  );
}

function Pay() {
  return (
    <RadioBoxField name="pay" defaultValue="post">
      <Radio name="cash">
        <Block>
          <i className={cn(styles['block__icon'], 'fas fa-wallet')} />
          <span className={styles['block__caption']}>Наличными</span>
        </Block>
      </Radio>
      <Radio name="online">
        <Block disabled={true}>
          <i className={cn(styles['block__icon'], 'fas fa-cash-register')} />
          <span className={styles['block__caption']}>Онлайн оплата</span>
        </Block>
      </Radio>
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
