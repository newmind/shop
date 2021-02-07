
module.exports = (db, DataType) => {

  const Order = db.define('Order', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    externalId: {
      type: DataType.UUID,
      unique: true,
    },
    customerId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    paymentId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    deliveryId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    currencyId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    statusId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        return Number(this.getDataValue('price'))
      },
    }
  });

  Order.associate = ({ Product, Payment, Delivery, Status, Currency }) => {

    Order.hasMany(Product, {
      foreignKey: 'orderId',
      as: 'products',
    });

    Order.belongsTo(Status, {
      foreignKey: 'statusId',
      as: 'status',
    });

    Order.belongsTo(Payment, {
      foreignKey: 'paymentId',
      as: 'payment',
    });

    Order.belongsTo(Delivery, {
      foreignKey: 'deliveryId',
      as: 'delivery',
    });

    Order.belongsTo(Currency, {
      foreignKey: 'currencyId',
      as: 'currency',
    });
  };

  return Order;
};
