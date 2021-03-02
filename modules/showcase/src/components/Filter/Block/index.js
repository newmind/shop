
import { CheckBox } from '@ui.packages/kit';

import React, { useState } from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from "./default.module.scss";


function Block({ title, items, values, onChange }) {
  const [isOpen, setOpen] = useState(true);

  function handleHide() {
    setOpen( ! isOpen);
  }

  function handleChange(id) {
    onChange(id);
  }

  return (
    <div className={cn(styles['block'], {
      [styles['block--has-selected']]: !! values.length
    })}>
      <div className={styles['header']} onClick={() => handleHide()}>
        <div className={styles['title']}>{ title }</div>
        <span className={cn(styles['icon'], {
          'fas fa-chevron-up': isOpen,
          'fas fa-chevron-down': ! isOpen,
        })} />
      </div>
      {isOpen && (
        <div className={styles['content']}>
          {items.map((item) => (
            <div key={item['id']} className={cn(styles['item'], {
              [styles['item--disabled']]: ! item['count'],
            })}>
              <div className={styles['item__value']}>
                <CheckBox
                  className={styles['check-box']}
                  label={item['value']}
                  disabled={ ! item['count']}
                  value={ !!~ values.indexOf(item['id'])}
                  onChange={() => handleChange(item['id'])}
                />
              </div>
              <div className={styles['item__count']}>
                { item['count'] }
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Block.propTypes = {
  items: types.array,
  values: types.array,
  onChange: types.func,
};

Block.defaultProps = {
  items: [],
  values: [],
  onChange: null,
};

export default Block;
