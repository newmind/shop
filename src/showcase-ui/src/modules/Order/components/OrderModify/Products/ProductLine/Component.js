
import types from 'prop-types';
import React, { PureComponent } from 'react';

import numeral from "@ui.packages/numeral";
import { Dialog } from "@ui.packages/dialog";
import { Button, Radio, RadioBoxField } from "@ui.packages/ui";

import Product from "./Product";
import RecipeModify from "./RecipeModify";

import cn from 'classnames';
import styles from "./default.module.scss";


class Component extends PureComponent {
  static propTypes = {
    fields: types.object,
    openDialog: types.func,
    closeDialog: types.func,
  };

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
      const hasRecipe = !! Object.keys(product['recipe'] || {}).length;
      return (
        <tbody key={index} className={styles['table__body']}>
          <tr className={styles['table__line']}>
            <td className={styles['table__col']}>
              <Product {...product['product']} />
            </td>
            <td className={styles['table__col']} style={{ textAlign: 'left' }}>
              <div className={styles['recipe']}>
                <RadioBoxField name={`${field}.goal`}>
                  <Radio className={styles['recipe__type']} name="only-rim" label="Только оправа" />
                  <Radio className={styles['recipe__type']} name="image-lenses" label="Имиджевые линзы" />
                  <Radio className={styles['recipe__type']} name="on-prescription" label="По рецепту" />
                </RadioBoxField>
                {isRecipe
                  ? (<div className={styles['recipe__info']}>{
                    hasRecipe
                      ? <p className={cn(styles['recipe__success'])}><i className='fas fa-check' /> Рецепт заполнен</p>
                      : <Button mode="success" size="s"
                                onClick={this._handleOpenDialogRecipe.bind(this, `${field}-recipe`)}>Добавить
                        рецепт</Button>
                  }</div>)
                  : null}
              </div>
            </td>
            <td className={styles['table__col']}>
              <div className={styles['amount']}>
                <span className={styles['amount__number']}>{numeral(product['amount']).format()}</span>
                <span className={styles['amount__currency']}>{product['currency']['value']}</span>
              </div>
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
