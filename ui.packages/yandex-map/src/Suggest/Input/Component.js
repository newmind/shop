
import { Input } from '@ui.packages/kit';

import React, { useState, useEffect } from 'react';

import cn from "classnames";
import styles from './defaults.module.scss';


export default function Suggest({ change, input: { name, onFocus, onBlur, ...input }, meta: { form, touched }, label, disabled }) {
  const [error, setError] = useState(null);
  const [hint, setHint] = useState(null);
  const [isChange, setChange] = useState(null);

  let suggestView = null;

  useEffect(() => {
    if ( ! ymaps) {
      return void 0;
    }

    ymaps.ready(() => {

      suggestView = new ymaps.SuggestView('input');
      suggestView.events.add('select', async (event) => {
        setChange(true);
        await checkSuggest(event.originalEvent.item.value);
      });
    });
    return () => {
      if ( ! suggestView) {
        return void 0;
      }
      suggestView.destroy();
    };
  }, []);

  function handleChange(value) {
    change(form, name, value);
  }

  async function checkSuggest(data) {
    const geocode = await ymaps.geocode(data);
    const result = geocode.geoObjects.get(0);

    if (result) {
      const property = result.properties.get('metaDataProperty.GeocoderMetaData.precision');
      switch (property) {
        case 'exact':
          setError(null);
          setHint(null);
          handleChange(data);
          break;
        case 'number':
        case 'near':
        case 'range':
          setError('Неточный адрес, требуется уточнение');
          setHint('Уточните номер дома');
          handleChange(data);
          break;
        case 'street':
          setError('Неполный адрес, требуется уточнение');
          setError('Уточните номер дома');
          handleChange(data);
          break;
        case 'other':
        default:
          setError('Неточный адрес, требуется уточнение');
          setHint('Уточните адрес');
          handleChange(data);
      }
    }
  }

  const hasError = ! disabled && hint && touched;
  const classNameInputWrapper = cn(styles['wrapper'], {
    [styles['wrapper--warning']]: hasError,
    [styles['wrapper--disabled']]: disabled,
  });

  return (
    <div className={classNameInputWrapper}>
      {label && (
        <p className={styles['label']}>{ label }</p>
      )}
      <div className={styles['container']}>
        <Input
          id="input"
          className={styles['border-right-bottom-none']}
          mode={hasError ? 'warning' : 'default'}
          autoComplete="address"
          onFocus={onFocus}
          onBlur={onBlur}
          {...input}
        />
        {hasError && (
          <span className={styles['error']}>
            <span className={styles['error__message']}>{ hint }</span>
          </span>
        )}
      </div>
    </div>
  );
}
