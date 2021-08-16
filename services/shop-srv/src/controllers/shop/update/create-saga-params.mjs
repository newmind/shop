
export default class CreateSagaParams {
  _shopId = null;
  _shop = null;

  getShopId() {
    return this._shopId;
  }

  setShopId(id) {
    this._shopId = id;
  }

  getShop() {
    return this._shop;
  }

  setShop(shop) {
    this._shop = shop;
  }
}
