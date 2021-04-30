
export default class CreateSagaParams {
  _customer = null;
  _prices = null;
  _orderId = null;
  _order = null;
  _pikassa = null;
  _products = [];

  getProducts() {
    return this._products;
  }

  setProducts(products) {
    this._products = products;
  }

  setPikassa(data) {
    this._pikassa = data;
  }

  getPikassa() {
    return this._pikassa;
  }

  setCustomer(customer) {
    this._customer = customer;
  }

  getCustomer() {
    return this._customer;
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
