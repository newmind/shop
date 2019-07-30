
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Button } from '@ui.packages/ui';

import Types from './Types';
import Recipe from './Recipe';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    product: types.object,
    initialValues: types.object,
  };

  static defaultProps = {
    product: {},
  };

  render() {
    const { handleSubmit, initialValues } = this.props;
    return (
      <form className={styles['wrapper']} onSubmit={handleSubmit}>
        <div className={styles['block']}>
          <h2 className={styles['block__header']}>Тип очков</h2>
          <div className={styles['block__content']}>
            <Types initialValues={initialValues} />
          </div>
        </div>
        <div className={styles['block']}>
          <h2 className={styles['block__header']}>Рецепт на очки</h2>
          <div className={styles['block__content']}>
            <Recipe />
          </div>
        </div>
        <div className={styles['block']}>
          <div className={styles['block__content']}>
            <Button type="submit" mode="primary">Добавить</Button>
          </div>
        </div>
      </form>
    );
  }
}

export default Component;
