
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
    paymentCode: {
      type: DataType.STRING,
      allowNull: false,
    },
    deliveryCode: {
      type: DataType.STRING,
      allowNull: false,
    },
    currencyCode: {
      type: DataType.STRING(8),
      allowNull: false,
    },
    statusCode: {
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
      foreignKey: 'statusCode',
      as: 'status',
    });

    Order.belongsTo(Payment, {
      foreignKey: 'paymentCode',
      as: 'payment',
    });

    Order.belongsTo(Delivery, {
      foreignKey: 'deliveryCode',
      as: 'delivery',
    });

    Order.belongsTo(Currency, {
      foreignKey: 'currencyCode',
      as: 'currency',
    });
  };

  return Order;
};
