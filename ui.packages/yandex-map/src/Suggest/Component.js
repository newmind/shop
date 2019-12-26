
import { InputField } from '@ui.packages/ui';

import types from 'prop-types';
import React, { PureComponent } from 'react';

// import styles from './defaults.module.scss';


class Component extends PureComponent {
  static propTypes = {
    name: types.string,
    label: types.string,
  };

  static defaultProps = {
    name: '',
    label: '',
  };

  state = {
    error: null,
    hint: null,
  };

  suggestView = null;

  componentDidMount() {

    if (!ymaps) {
      return void 0;
    }

    ymaps.ready(() => {

      this.suggestView = new ymaps.SuggestView('input');
      this.suggestView.events.add('select', async (event) => {
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

  async _checkSuggest(data) {
    try {
      const geocode = await ymaps.geocode(data);
      const result = geocode.geoObjects.get(0);

      if (result) {
        const property = result.properties.get('metaDataProperty.GeocoderMetaData.precision');
        switch (property) {
          case 'exact':
            this.setState({
              error: null,
              hint: null,
            });
            break;
          case 'number':
          case 'near':
          case 'range':
            this.setState({
              error: 'Неточный адрес, требуется уточнение',
              hint: 'Уточните номер дома'
            });
            break;
          case 'street':
            this.setState({
              error: 'Неполный адрес, требуется уточнение',
              hint: 'Уточните номер дома',
            });
            break;
          case 'other':
          default:
            this.setState({
              error: 'Неточный адрес, требуется уточнение',
              hint: 'Уточните адрес',
            });
        }
      }
    }
    catch(error) {
      console.log(error)
    }
  }

  render() {
    const { hint } = this.state;
    const { name, label } = this.props;
    return (
      <InputField id="input" autoComplete="address" name={name} label={label} error={hint} />
    );
  }
}

export default Component;
