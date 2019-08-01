
import React, { PureComponent } from 'react';
import { Fields } from 'redux-form';

import numeral from "@ui.packages/numeral";
import { Dialog } from "@ui.packages/dialog";
import { Button, Radio, RadioBoxField } from "@ui.packages/ui";

import Product from "./Product";
import RecipeModify from "./RecipeModify";

import cn from "classnames";
import styles from "../default.module.scss";


class Component extends PureComponent {

  _handleOpenDialogRecipe(dialogName) {
    const { openDialog } = this.props;
    openDialog(dialogName);
  }

  _handleCloseDialog(dialogName, field, value) {
    const { closeDialog, onChange } = this.props;
    onChange('order', field, value);
    closeDialog(dialogName);
  }

  render() {
    const { fields} = this.props;
    return fields.map((field, index) => {
      const product = fields.get(index);
      const isRecipe = product['goal'] === 'on-prescription';
      const hasRecipe = !! Object.keys(product['recipe']).length;
      return (
        <tbody key={index} className={styles['table__body']}>
        <tr className={styles['table__line']}>
          <td className={styles['table__col']}>
            <Product {...product['product']} />
          </td>
          <td className={styles['table__col']} style={{ textAlign: 'left' }}>
            <RadioBoxField name={`${field}.goal`}>
              <Radio name="only-rim" label="Только оправа" />
              <Radio name="image-lenses" label="Имиджевые линзы" />
              <Radio name="on-prescription" label="По рецепту" />
            </RadioBoxField>
            {hasRecipe
              ? <p>Заполнен</p>
              : <Button disabled={ ! isRecipe} onClick={this._handleOpenDialogRecipe.bind(this, `${field}-recipe`)}>Добавить рецепт</Button>}
          </td>
          <td className={cn(styles['table__col'], styles['amount'])}>
            {numeral(product['amount']).format()} {product['currency']['value']}
          </td>
          <td>
            <Dialog name={`${field}-recipe`} title="Рецепт">
              <RecipeModify
                recipe={product['recipe']}
                onSubmit={this._handleCloseDialog.bind(this, `${field}-recipe`, `${field}.recipe`)}
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

export default Component;
