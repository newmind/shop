
export default class CreateSagaParams {
  _productUUID = null;
  _product = null;

  getProductUUID() {
    return this._productUUID;
  }

  setProductUUID(uuid) {
    this._productUUID = uuid;
  }

  getProduct() {
    return this._product;
  }

  setProduct(product) {
    this._product = product;
  }
}
