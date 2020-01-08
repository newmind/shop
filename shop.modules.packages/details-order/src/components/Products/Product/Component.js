
import { Gallery } from "@ui.packages/ui";
import numeral from "@ui.packages/numeral";

import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';

import styles from "./default.module.scss";


class Component extends PureComponent {
  render() {
    const { type, product: { id, product: { gallery, brand, name }}} = this.props;

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
          {(type === 'only-rim') && <p className={styles['type']}>Тип изготовления: Только оправа</p>}
          {(type === 'on-prescription') && <p className={styles['type']}>Тип изготовления: Очки по рецепту</p>}
          {(type === 'image-lenses') && <p className={styles['type']}>Тип изготовления: С имиджевыми линзами</p>}
        </div>
      </div>
    );
  }
}

export default Component;
