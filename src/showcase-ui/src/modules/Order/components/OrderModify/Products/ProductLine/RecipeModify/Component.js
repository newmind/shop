
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Button } from '@ui.packages/ui';

import Types from './Types';
import Recipe from './Recipe';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    recipe: types.object,
  };

  static defaultProps = {
    recipe: {},
  };

  constructor(props) {
    super(props);

    const { recipe } = props;

    this.state = {
      part: 'eye-glasses',
      type: -1,
      recipe: {
        PDLeft: 'average',
        PDRight: 'average',
        sphRight: 'plano',
        sphLeft: 'plano',
        cylRight: 'plano',
        cylLeft: 'plano',
        axisRight: '0',
        axisLeft: '0',
        addRight: '0.00',
        addLeft: '0.00',
      },
      ...recipe,
    };
  }

  _handleSetType(value) {
    this.setState({ ...value });
  }

  _handleSetRecipe(recipe) {
    this.setState({ recipe });
  }

  _isValid() {
    const { type } = this.state;

    if (type === -1) {
      return false;
    }

    return true;
  }

  _handleSubmit() {
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  render() {
    const { type, part, recipe } = this.state;
    return (
      <div className={styles['wrapper']}>
        <div className={styles['block']}>
          <h2 className={styles['block__header']}>Тип очков</h2>
          <div className={styles['block__content']}>
            <Types type={type} part={part} onChange={this._handleSetType.bind(this)} />
          </div>
        </div>
        <div className={styles['block']}>
          <h2 className={styles['block__header']}>Рецепт на очки</h2>
          <div className={styles['block__content']}>
            <Recipe recipe={recipe} onChange={this._handleSetRecipe.bind(this)} />
          </div>
        </div>
        <div className={styles['block']}>
          <div className={styles['block__content']}>
            <Button disabled={ ! this._isValid()} type="button" mode="primary" onClick={this._handleSubmit.bind(this)}>Добавить</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Component;
