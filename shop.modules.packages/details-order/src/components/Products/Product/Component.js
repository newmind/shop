
import { Gallery } from "@ui.packages/ui";

import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';

import Recipe from './Recipe';
import Lens from './Lens';

import styles from "./default.module.scss";


class Component extends PureComponent {
  render() {
    const { type, recipe, lens, product: { id, product: { gallery, brand, name }}} = this.props;

    return (
      <div className={styles['product']}>
        <div className={styles['gallery']}>
          <div className={styles['gallery__images']}>
            <Gallery items={gallery} valueKey="id" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
          </div>
        </div>
        <div className={styles['content']}>
          <p className={styles['brand']}>
            <Link className={styles['brand__link']} to={process.env['PUBLIC_URL'] + `/products/${id}`}>{ brand }</Link>
          </p>
          {name && <p className={styles['name']}>{ name }</p>}
          {(type === 'only-rim') && (
            <p className={styles['type']}>
              <span className={styles['label']}>Тип изготовления:</span>
              <span className={styles['value']}>Только оправа</span>
            </p>
          )}
          {(type === 'on-prescription') && (
            <p className={styles['type']}>
              <span className={styles['label']}>Тип изготовления:</span>
              <span className={styles['value']}>Очки по рецепту</span>
            </p>
          )}
          {(type === 'image-lenses') && (
            <p className={styles['type']}>
              <span className={styles['label']}>Тип изготовления:</span>
              <span className={styles['value']}>С имиджевыми линзами</span>
            </p>
          )}
          {(type === 'on-prescription') && (
            <div className={styles['prescription']}>
              <Recipe {...recipe} />
              <Lens {...lens} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Component;
