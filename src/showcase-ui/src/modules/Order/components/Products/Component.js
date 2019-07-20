
import React, { Fragment, PureComponent } from 'react';

import { Dialog } from '@ui.packages/dialog';
import { nounDeclension } from "@ui.packages/utils";
import { Button } from '@ui.packages/ui';
import numeral from '@ui.packages/numeral';

import Product from './Product';
import RecipeModify from './RecipeModify';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      product: null,
    };
  }

  _calculateFullAmount() {
    const { products } = this.props;
    const fullAmount = products.reduce((accumulator, product) => accumulator + product['amount'], 0);
    return numeral(fullAmount).format();
  }

  _handleOpenDialogRecipe(product) {
    const { openDialog } = this.props;
    this.setState({ product }, () => openDialog('recipe'));
  }

  _handleCloseDialog() {
    this.setState({ product: null });
  }

  _handleSetRecipeToProduct(productId, formData) {
    const { onUpdateProduct } = this.props;
    onUpdateProduct({ id: productId, recipe: formData });

  }

  render() {
    const { product = {} } = this.state;
    const { products } = this.props;
    const productsCount = Object.keys(products).length;
    return (
      <Fragment>
        <table className={styles['table']}>
          <thead className={styles['table__head']}>
          <tr className={styles['table__line']}>
            <th className={cn(styles['table__col'], styles['product'])}>
              <span className={styles['table__header']}>{productsCount} {nounDeclension(productsCount, ['Товар', 'Товара', 'Товаров'])}</span>
            </th>
            <th className={cn(styles['table__col'], styles['recipe'])}>
              <span className={styles['table__header']}>Рецепт</span>
            </th>
            <th className={cn(styles['table__col'], styles['amount'])}>
              <span className={styles['table__header']}>Цена</span>
            </th>
          </tr>
          </thead>
          <tbody className={styles['table__body']}>
          {products.map((product, index) => (
            <tr key={index} className={styles['table__line']}>
              <td className={styles['table__col']}>
                <Product {...product['product']} />
              </td>
              <td className={styles['table__col']} style={{ textAlign: 'center' }}>
                <Button onClick={this._handleOpenDialogRecipe.bind(this, product)}>Добавить рецепт</Button>
              </td>
              <td className={cn(styles['table__col'], styles['amount'])}>
                {numeral(product['amount']).format()} {product['currency']['value']}
              </td>
            </tr>
          ))}
          </tbody>
          <caption className={styles['table__caption']}>Итого: { this._calculateFullAmount() } руб.</caption>
        </table>
        <Dialog name="recipe" title="Рецепт">
          <RecipeModify
            product={product}
            initialValues={product && (product['recipe'] || {})}
            onSubmit={this._handleSetRecipeToProduct.bind(this, product && product['id'])}
            onClose={this._handleCloseDialog.bind(this)}
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default Component;
