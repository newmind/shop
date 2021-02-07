
module.exports = (db, DataType) => {

  const Order = db.define('Order', {
    uuid: {
      type: DataType.UUID,
      primaryKey: true,
      unique: true,
      index: true,
    },
    amount: {
      type: DataType.INTEGER,
    },
    finalAmount: {
      type: DataType.INTEGER,
    },
    description: {
      type: DataType.STRING(1024),
    },
    currencyUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    statusCode: {
      type: DataType.INTEGER,
      allowNull: false,
    }
  });

  Order.associate = function({ Product, Currency, Status, OrderProduct }) {

    Order.belongsTo(Currency, {
      foreignKey: 'currencyUuid',
      as: 'currency',
    });

    Order.belongsTo(Status, {
      foreignKey: 'statusCode',
      sourceKey: 'code',
      as: 'status',
    });

    Order.belongsToMany(Product, {
      through: OrderProduct,
      foreignKey: 'orderUuid',
      otherKey: 'productUuid',
      as: 'products',
    });
  };

  return Order;
};
