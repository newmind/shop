
module.exports = (db, DataType) => {

  const OrderProducts = db.define('OrderProducts', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    orderId: {
      type: DataType.INTEGER,
    },
    productId: {
      type: DataType.STRING(9),
    },
    type: {
      type: DataType.STRING,
    },
    recipe: {
      type: DataType.JSON,
    },
    lens: {
      type: DataType.JSON,
    }
  });

  OrderProducts.associate = ({ Product }) => {

    OrderProducts.belongsTo(Product, {
      sourceKey: 'uuid',
      foreignKey: 'productId',
      as: 'product',
    });
  };

  return OrderProducts;
};
