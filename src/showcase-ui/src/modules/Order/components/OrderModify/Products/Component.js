
import React, { Fragment, PureComponent } from 'react';
import { FieldArray } from 'redux-form';

import { Dialog } from '@ui.packages/dialog';
import { nounDeclension } from "@ui.packages/utils";
import { Button, RadioBoxField, Radio } from '@ui.packages/ui';
import numeral from '@ui.packages/numeral';

import Product from './Product';
import RecipeModify from './RecipeModify';

import cn from 'classnames';
import styles from './default.module.scss';


class ProductField extends PureComponent {

  _handleOpenDialogRecipe(dialogName) {
    const { openDialog } = this.props;
    openDialog(dialogName);
  }

  _handleCloseDialog(dialogName) {
    const { closeDialog } = this.props;
    closeDialog(dialogName);
  }

  render() {
    const { fields, meta: { touched, error }} = this.props;
    return fields.map((field, index) => {
      const product = fields.get(index);
      console.log(111, product);
      return (
        <tbody key={index} className={styles['table__body']}>
          <tr className={styles['table__line']}>
            <td className={styles['table__col']}>
              <Product {...product['product']} />
            </td>
            <td className={styles['table__col']} style={{ textAlign: 'center' }}>
              <RadioBoxField name={`${field}.receipt`}>
                <Radio name="only-rim" label="Только оправа" />
                <Radio name="image-lenses" label="Имиджевые линзы" />
                <Radio name="on-prescription" label="По рецепту" />
              </RadioBoxField>
              <Button onClick={this._handleOpenDialogRecipe.bind(this, `${field}-recipe`)}>Добавить рецепт</Button>
            </td>
            <td className={cn(styles['table__col'], styles['amount'])}>
              {numeral(product['amount']).format()} {product['currency']['value']}
            </td>
            <td>
              <Dialog name={`${field}-recipe`} title="Рецепт">
                <RecipeModify
                  initialValues={`${product}.recipe`}
                  onSubmit={this._handleCloseDialog.bind(this, `${field}-recipe`)}
                  onClose={this._handleCloseDialog.bind(this, `${field}-recipe`)}
                />
              </Dialog>
            </td>
          </tr>
        </tbody>
      )
    });
  }
}


class Component extends PureComponent {

  _calculateFullAmount() {
    const { products } = this.props;
    const fullAmount = products.reduce((accumulator, product) => accumulator + product['amount'], 0);
    return numeral(fullAmount).format();
  }

  render() {
    const { products, ...props } = this.props;
    const productsCount = Object.keys(products).length;
    return (
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
            <th style={{width: 0}} />
          </tr>
        </thead>
        <FieldArray name="products" component={ProductField} {...props} />
        <caption className={styles['table__caption']}>Итого: { this._calculateFullAmount() } руб.</caption>
      </table>
    );
  }
}

export default Component;
