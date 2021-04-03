
export default class CreateSagaParams {
  _customerId = null;
  _prices = null;
  _orderId = null;
  _order = null;

  setCustomerId(id) {
    this._customerId = id;
  }

  getCustomerId() {
    return this._customerId;
  }

  setPrices(prices) {
    this._prices = prices[0];
  }

  getPrices() {
    return this._prices;
  }

  setOrderId(id) {
    this._orderId = id;
  }

  getOrderId() {
    return this._orderId;
  }

  setOrder(order) {
    this._order = order;
  }

  getOrder() {
    return this._order;
  }
}
