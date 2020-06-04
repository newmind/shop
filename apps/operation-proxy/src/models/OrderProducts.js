
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
      allowNull: false,
    },
    productId: {
      type: DataType.STRING(9),
      allowNull: false,
    },
    type: {
      type: DataType.STRING,
      allowNull: false,
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

  OrderProducts.associate = ({ Product, Currency, Prescription }) => {

    OrderProducts.hasOne(Prescription, {
      foreignKey: 'orderId',
      as: 'recipe',
    });

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
