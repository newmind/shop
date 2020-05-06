
import { Input } from '@ui.packages/kit';

import React, { PureComponent } from 'react';

import cn from "classnames";
import styles from './defaults.module.scss';


class Component extends PureComponent {
  state = {
    error: null,
    hint: null,
  };

  isChange = false;
  suggestView = null;

  componentDidMount() {

    if ( ! ymaps) {
      return void 0;
    }

    ymaps.ready(() => {

      this.suggestView = new ymaps.SuggestView('input');
      this.suggestView.events.add('select', async (event) => {
        this.isChange = true;
        await this._checkSuggest(event.originalEvent.item.value);
      });
    });
  }

  componentWillUnmount() {

    if ( ! this.suggestView) {
      return void 0;
    }

    this.suggestView.destroy();
  }

  _handleChange(value) {
    const { change, input: { name }, meta: { form }} = this.props;
    change(form, name, value);
  }

  async _checkSuggest(data) {
    const geocode = await ymaps.geocode(data);
    const result = geocode.geoObjects.get(0);

    if (result) {
      const property = result.properties.get('metaDataProperty.GeocoderMetaData.precision');
      switch (property) {
        case 'exact':
          this.setState({
            error: null,
            hint: null,
          }, this._handleChange.bind(this, data));
          break;
        case 'number':
        case 'near':
        case 'range':
          this.setState({
            error: 'Неточный адрес, требуется уточнение',
            hint: 'Уточните номер дома',
          }, this._handleChange.bind(this, data));
          break;
        case 'street':
          this.setState({
            error: 'Неполный адрес, требуется уточнение',
            hint: 'Уточните номер дома',
          }, this._handleChange.bind(this, data));
          break;
        case 'other':
        default:
          this.setState({
            error: 'Неточный адрес, требуется уточнение',
            hint: 'Уточните адрес',
          }, this._handleChange.bind(this, data));
      }
    }
  }

  render() {
    const { hint } = this.state;
    const { label, disabled, input: { onFocus, onBlur, ...input }, meta: { touched }} = this.props;
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
        <div ref={this.containerRef} className={styles['container']}>
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
}

export default Component;