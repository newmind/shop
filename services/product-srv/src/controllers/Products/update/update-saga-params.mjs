
export default class UpdateSagaParams {
  _imageIDs = null;
  _product = null;

  getImageIDs() {
    return this._imageIDs;
  }

  setImageIDs(ids) {
    this._imageIDs = ids;
  }

  getProduct() {
    return this._product;
  }

  setProduct(product) {
    this._product = product;
  }
}
