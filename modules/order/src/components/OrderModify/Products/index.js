
import { selectItems } from '@ui.packages/cart';

import React from 'react';
import types from 'prop-types';
import { useSelector } from 'react-redux';

import DefaultProduct from './DefaultProduct';
import FurtherProduct from './FurtherProduct';

import styles from './default.module.scss';


// function getSortedProducts(fields) {
//   return fields.reduce((initial, field, index) => {
//     const product = fields.get(index);
//
//     if (product['params'] === 'further') {
//       initial['further'].push({ ...product, field });
//     }
//     else {
//       initial['another'].push(product);
//     }
//
//     return initial;
//   }, {
//     further: [],
//     another: [],
//   });
// }

export default function Products({  }) {
  const products = useSelector(selectItems);

  return (
    <div className={styles['wrapper']}>
      {products.map((product) => {
        if (product['params'] === 'further') {
          return <FurtherProduct key={product['uuid']} {...product} />;
        }
        return <DefaultProduct key={product['uuid']} {...product} />
      })}
    </div>
    //   { !! products['another'].length && (
    //     <div className={styles['with-another']}>
    //       {reduceToArray(products['another'], 2, { fillNull: true }).map((line, index) => (
    //         <div key={index} className={styles['with-another__line']}>
    //           {line.map((product, index) => {
    //             return (
    //               <div key={index} className={cn(styles['with-another__col'], {
    //                 [styles['with-another__col--no-border']]: ! product,
    //               })}>
    //                 {/*{product && <ProductWithAnother {...product} />}*/}
    //               </div>
    //             );
    //           })}
    //         </div>
    //       ))}
    //     </div>
    //   )}
    //   { !! products['further'].length && (
    //     <div className={styles['with-further']}>
    //       {products['further'].map((product, index) => {
    //         // return <ProductWithFurther key={index} index={index} field={product['field']} {...product} />
    //       })}
    //     </div>
    //   )}
    // </Suspense>
  );
}

Products.propTypes = {
  fields: types.object,
};

Products.defaultProps = {
  fields: {},
};
