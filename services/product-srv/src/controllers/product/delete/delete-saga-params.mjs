
export default class UpdateSagaParams {
  _productUuid = null;

  getProductUuid() {
    return this._productUuid;
  }

  setProductUuid(uuid) {
    this._productUuid = uuid;
  }
}
