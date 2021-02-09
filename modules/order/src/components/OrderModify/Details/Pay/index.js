
import { RadioBoxField, Radio } from "@ui.packages/kit";

import React from 'react';
import { connect, useSelector } from 'react-redux';
import { getFormValues } from 'redux-form';

import cn from 'classnames';
import styles from './default.module.scss';

import { selectPayments } from '../../../../ducks/slice';


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
  const payments = useSelector(selectPayments);

  return (
    <RadioBoxField name="payment" defaultValue="post">
      {payments.map((payment, index) => (
        <Radio key={index} name={payment['code']}>
          <Block>
            <span className={styles['block__caption']}>{ payment['name'] }</span>
          </Block>
        </Radio>
      ))}
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
