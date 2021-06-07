
import { Tabs, Tab, TabContainer} from '@ui.packages/tabs';
import { Gallery, Breadcrumbs, Text } from '@ui.packages/kit';

import React from 'react';
import { useSelector } from 'react-redux';

import Information from './Information';
import Comments from './Comments';
import Characteristics from './Characteristics';

import styles from './default.module.scss';

import { selectProduct } from '../ducks/slice';


function Product() {
  const product = useSelector(selectProduct);

  if ( ! product) {
    return null;
  }

  return (
    <article className={styles['wrapper']}>
      <div className={styles['common']}>
        <div className={styles['breadcrumbs']}>
          <Breadcrumbs items={[
            {
              href: process.env['PUBLIC_URL'] + '/products?typeId=' + product['type']['id'],
              title: product['type']['value'],
            },
            {
              href: process.env['PUBLIC_URL'] + `/products?categoryId=${product['category']['id']}&typeId=${product['type']['id']}`,
              title: product['category']['value'],
            },
            {
              href: process.env['PUBLIC_URL'] + `/products?categoryId=${product['category']['id']}&typeId=${product['type']['id']}&brandId=${product['brand']['id']}`,
              title: product['brand']['value'],
            },
            {
              title: product['name'],
            }
          ]} />
        </div>
        <div className={styles['product']}>
          <div className={styles['gallery']}>
            <Gallery items={product['gallery']} path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
          </div>
          <div className={styles['information']}>
            <Information {...product} />
          </div>
        </div>
      </div>
      <Tabs name={'product'} defaultTab={'description'}>
        <div className={styles['aside']}>
          <div className={styles['content']}>
            <div className={styles['tabs']}>
              <Tab name={'description'}>Описание</Tab>
              <Tab name={'characteristics'}>Характеристика</Tab>
              <Tab name={'comments'}>Отзывы</Tab>
            </div>
          </div>
        </div>
        <div className={styles['description']}>
          <div className={styles['content']}>
            <TabContainer to={'description'}>
              <div className={styles['container']}>
                <Text theme={'light'}>{ product['description'] }</Text>
              </div>
            </TabContainer>
            <TabContainer to={'characteristics'}>
              <Characteristics />
            </TabContainer>
            <TabContainer to={'comments'}>
              <Comments comments={product['comments']} />
            </TabContainer>
          </div>
        </div>
      </Tabs>
    </article>
  );
}

Product.propTypes = {};

Product.defaultProps = {};

export default Product;
