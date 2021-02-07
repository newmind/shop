
module.exports = (db) => {

  const OrderProduct = db.define('OrderProduct', {}, {
    timestamps: false,
  });

  OrderProduct.associate = () => {};

  return OrderProduct;
};
