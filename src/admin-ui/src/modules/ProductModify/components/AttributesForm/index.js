
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Row, Col, InputField } from '@packages/ui';

import cn from 'classnames';
import styles from './default.module.scss';


class Attribute extends PureComponent {
  static propTypes = {
    field: types.string,
    onRemove: types.func,
  };

  static defaultProps = {
    field: '',
  };

  _handleRemove() {
    const { onRemove } = this.props;
    onRemove && onRemove();
  }

  render() {
    const { field } = this.props;
    const classNameRemoveAttr = cn(styles['attr__remove'], 'far fa-trash-alt');
    return (
      <div className={styles['attr']}>
        <div className={styles['attr__title']}>
          <InputField label="Назавание" name={`${field}.name`} />
        </div>
        <div className={styles['attr__value']}>
          <InputField label="Значение" name={`${field}.value`} />
        </div>
        <div className={styles['attr__controls']}>
          <span className={classNameRemoveAttr} onClick={this._handleRemove.bind(this)} />
        </div>
      </div>
    );
  }
}


class Component extends PureComponent {
  static propTypes = {
    path: types.string,
  };

  static defaultProps = {
    path: '',
  };

  _handleAddAttr() {
    const { fields } = this.props;
    fields.push({});
  }

  _handleRemoveAttr(index) {
    const { fields } = this.props;
    fields.remove(index)
  }

  render() {
    const { fields } = this.props;
    return (
      <div className={styles['wrapper']}>
        {!!fields.length && (<Row>
          <div className={styles['attrs']}>
          {fields.map((field, index) => <Attribute key={index} field={field} onRemove={this._handleRemoveAttr.bind(this, index)} />)}
          </div>
        </Row>)}
        <Row>
          <Col>
            <span className={styles['add-attr']} onClick={this._handleAddAttr.bind(this)}>
              <span className={cn('fas fa-plus', styles['add-attr__icon'])}/>
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Component;
