
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { nounDeclension } from '@ui.packages/utils';
import { Dialog, Confirm } from '@ui.packages/dialog';
import { Button, Col, Gallery, Row, Table } from "@ui.packages/ui";
import numeral from "@packages/numeral";

import ModifyDialog from './ModifyDialog';

import cn from "classnames";
import styles from "./default.module.scss";


class Component extends PureComponent {
  static propTypes = {
    currencies: types.array,
    products: types.array,
    openDialog: types.func,
  };

  static defaultProps = {
    currencies: [],
    products: [],
  };

  state = {
    productId: null,
    product: null,
  };

  _onCloseDialog() {
    const { closeDialog } = this.props;
    this.setState({ product: null }, () => closeDialog('modify-stock-product'));
  }

  _handleCancelRemove() {
    const { closeDialog } = this.props;
    this.setState({ productId: null }, () => closeDialog('remove-confirm'));
  }

  _handleOpenModifyProductDialog(product = null) {
    const { openDialog } = this.props;
    openDialog('modify-stock-product');
    if (product) {
      this.setState({ product });
    }
  }

  _handleRemoveProduct(id) {
    const { openDialog } = this.props;
    this.setState({ productId: id }, () => openDialog('remove-confirm'));
  }

  async _handleConfirmRemove() {
    const { productId } = this.state;
    const { removeProductById, closeDialog } =  this.props;
    await removeProductById(productId);
    this.setState({ productId: null }, () => closeDialog('remove-confirm'));
  }

  async _handleAddProduct(formData) {
    const { closeDialog, createProduct } = this.props;
    await createProduct({
      count: Number(formData['count']),
      amount: Number(formData['amount']),
      productId: formData['product']['id'],
      currencyId: formData['currency']['id'],
      categoryId: formData['category'] ? formData['category']['id'] : null,
    });
    closeDialog('modify-stock-product');
  }

  async _handleUpdateProduct(formData) {
    const { updateStockProductById } = this.props;
    await updateStockProductById({
      id: formData['id'],
      count: Number(formData['count']),
      amount: Number(formData['amount']),
      productId: formData['product']['id'],
      currencyId: formData['currency']['id'],
      categoryId: formData['category'] && formData['category']['id'],
    });
    this._onCloseDialog();
  }

  render() {
    const { product } = this.state;
    const { stock, inProcess } = this.props;
    return (
      <div className="page">
        <Row>
          <Col>
            <Button mode="primary" disabled={inProcess} onClick={this._handleOpenModifyProductDialog.bind(this)}>Добавить товар на склад</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              items={stock}
              columns={[
                {
                  title: 'ID',
                  alias: 'id',
                  attrs: {
                    width: '60px'
                  }
                },
                {
                  title: 'Изображение',
                  alias: 'product',
                  attrs: {
                    align: 'center',
                    width: '140px',
                  },
                  template: ({ gallery }) => <Gallery className={styles['image']} valueKey={'id'} items={gallery} path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
                },
                {
                  title: 'Категория',
                  alias: 'category',
                  attrs: {},
                  template: (category) => {
                    return (
                      <div className={styles['col']}>
                        <p className={styles['name']}>{category ? category['name'] : '[без категории]'}</p>
                      </div>
                    );
                  },
                },
                {
                  title: 'Продукт',
                  alias: 'product',
                  template: (product) => {
                    return (
                      <div className={styles['col']}>
                        <p className={styles['name']}>Название: { product['name'] }</p>
                        <p className={styles['brand']}>Бренд: { product['brand'] }</p>
                        <p className={styles['amount']}>Сумма: { product['amount'] }</p>
                      </div>
                    );
                  }
                },
                {
                  title: 'Стоимость',
                  attrs: {
                    align: 'right',
                    width: '150px'
                  },
                  template: ({ amount, currency }) => {
                    return (
                      <div className={styles['amount']}>
                        <span className={styles['amount__value']}>{ numeral(amount).format() }</span>
                        <span className={styles['amount__currency']}>{ currency ? currency['value'] : '[нет]' }</span>
                      </div>
                    );
                  }
                },
                {
                  title: 'Количество',
                  alias: 'count',
                  attrs: {
                    align: 'right',
                    width: '150px'
                  },
                  transform: value => `${value} ${nounDeclension(value, ['штука', 'штуки', 'штук'])}`
                },
                {
                  attrs: {
                    width: '70px',
                    vAlign: 'middle',
                  },
                  template: (product) => {
                    return (
                      <div className={styles['actions']}>
                        <span className={cn(styles['actions__item'], styles['actions__item--trash'], "fas fa-trash-alt")} onClick={this._handleRemoveProduct.bind(this, product['id'])} />
                        <span className={cn(styles['actions__item'], styles['actions__item--edit'], "fas fa-pencil-alt")} onClick={this._handleOpenModifyProductDialog.bind(this, product)} />
                      </div>
                    );
                  }
                }
              ]}
            />
          </Col>
        </Row>
        <Dialog name="modify-stock-product" title={product ? 'Обновить товар' : 'Добавить товар'} onClose={this._onCloseDialog.bind(this)}>
          <ModifyDialog
            initialValues={product}
            onSubmit={product ? this._handleUpdateProduct.bind(this) : this._handleAddProduct.bind(this)}
          />
        </Dialog>
        <Confirm
          name="remove-confirm"
          message="Вы уверены, что хотите удалить продукт со склада?"
          onConfirm={this._handleConfirmRemove.bind(this)}
          onCancel={this._handleCancelRemove.bind(this)}
        />
      </div>
    );
  }
}

export default Component;
