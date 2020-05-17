
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
    },
    amount: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        const amount = this.getDataValue('amount');
        return Number(amount)
      },
    },
    currencyId: {
      type: DataType.UUID,
      allowNull: false,
    },
  });

  OrderProducts.associate = ({ Product, Currency }) => {

    OrderProducts.belongsTo(Currency, {
      foreignKey: 'currencyId',
      as: 'currency',
    });

    OrderProducts.belongsTo(Product, {
      sourceKey: 'uuid',
      foreignKey: 'productId',
      as: 'product',
    });
  };

  return OrderProducts;
};
