
import types from 'prop-types';
import React, { PureComponent } from 'react';

// import numeral from '@ui.packages/numeral';
import { Confirm } from "@ui.packages/dialog";
import { Table, Row, Col } from '@ui.packages/ui';

import cn from 'classnames';
import styles from './default.module.scss';



class Component extends PureComponent {
  static propTypes = {
    products: types.array,
  };

  static defaultProps = {
    products: [],
  };

  state = {
    productId: null,
  };

  _handleCancelRemove() {
    const { closeDialog } = this.props;
    this.setState({ productId: null }, () => closeDialog('remove-confirm'));
  }

  _handleOpenConfirmRemoveProduct(productId) {
    const { openDialog } = this.props;
    this.setState({ productId }, () => openDialog('remove-confirm'));
  }

  _handleConfirmRemove() {
    const { productId } = this.state;
    const { removeProductById } = this.props;
    removeProductById(productId);
  }

  render() {
    const { products } = this.props;
    return (
      <div className="page">
        <Row>
          <Col>
            <Table
              items={products}
              columns={[
                {
                  alias: 'name',
                  title: 'Наименование',
                },
                {
                  alias: 'brand',
                  title: 'Бранд',
                },
                {
                  alias: 'description',
                  title: 'Описание',
                },
                {
                  attrs: {
                    width: '70px',
                    vAlign: 'middle',
                  },
                  template: ({ id }) => {
                    const toArchiveClassName = cn(styles['actions__item'], styles['actions__item--trash'], 'far fa-trash-alt');
                    return (
                      <div className={styles['actions']}>
                        <span className={toArchiveClassName} onClick={this._handleOpenConfirmRemoveProduct.bind(this, id)} />
                      </div>
                    );
                  }
                }
              ]}
            />
          </Col>
        </Row>
        <Confirm
          name="remove-confirm"
          message="Вы уверены, что хотите удалить продукт?"
          onConfirm={this._handleConfirmRemove.bind(this)}
          onCancel={this._handleCancelRemove.bind(this)}
        />
      </div>
    );
  }
}

export default Component;
