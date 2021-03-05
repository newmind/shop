
import { queryToObject } from "@ui.packages/utils";

import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Option({ title, name, direct, onClick }) {
  const iconClassName = cn(styles['icon'], {
    'fas fa-long-arrow-alt-up': direct === 'asc',
    'fas fa-long-arrow-alt-down': direct === 'desc',
  });

  return (
    <div className={styles['option']} onClick={() => onClick(name, direct)}>
      <span className={styles['title']}>{ title }</span>
      <span className={iconClassName} />
    </div>
  );
}

function Select({ items, onChange }) {
  const location = useLocation();
  const { sort = '' } = queryToObject(location['search']);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(function() {
    let item;
    if (sort) {
      const [name, direct] = sort.split(':');
      item = items.find((item) => {
        return item['name'] === name && item['direct'] === direct;
      });
    }
    setSelected(item || items[0]);
  }, [sort]);

  useEffect(function() {
    function resetState() {
      setOpen(false);
    }

    document.addEventListener('click', resetState);
    return () => {
      document.removeEventListener('click', resetState);
    };
  }, []);

  function handleChange(name, direct) {
    onChange(`${name}:${direct}`);
  }

  function handleState(event) {
    event.stopPropagation();
    setOpen( ! isOpen);
  }

  return (
    <div className={cn(styles['wrapper'], {
      [styles['open']]: isOpen,
    })}>
      <div className={styles['value']} onClick={(event) => handleState(event)}>
        <div className={styles['text']}>{ selected && selected['title'] }</div>
        <span className={cn(styles['icon'], {
          'fas fa-long-arrow-alt-up': selected && selected['direct'] === 'asc',
          'fas fa-long-arrow-alt-down': selected && selected['direct'] === 'desc',
        })} />
      </div>
      {isOpen && (
        <div className={styles['list']}>
          <div className={styles['options']}>
            {items.map((item, index) => <Option key={index} title={item['title']} name={item['name']} direct={item['direct']} onClick={handleChange} />)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Select;
