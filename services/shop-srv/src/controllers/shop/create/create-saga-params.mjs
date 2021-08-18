
export default class CreateSagaParams {
  _shopId = null;
  _shop = null;
  _deliveries = [];

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

  getDeliveries() {
    return this._deliveries;
  }

  setDeliveries(data) {
    this._deliveries = data;
  }
}
