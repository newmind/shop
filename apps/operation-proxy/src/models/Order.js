
module.exports = (db, DataType) => {

  const Order = db.define('Order', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    externalId: {
      type: DataType.STRING(64),
      allowNull: false,
    },
    invoiceId: {
      type: DataType.STRING(64),
      allowNull: false,
    },
    paymentLink: {
      type: DataType.STRING,
      allowNull: false,
    },
    address: {
      type: DataType.STRING(512),
      allowNull: false,
    },
    email: {
      type: DataType.STRING(126),
      allowNull: false,
    },
    phone: {
      type: DataType.STRING(126),
      allowNull: false,
    },
    name: {
      type: DataType.STRING(126),
      allowNull: false,
    },
    surname: {
      type: DataType.STRING(126),
      allowNull: false,
    },
    amount: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
      get() {
        const amount = this.getDataValue('amount');
        return Number(amount);
      },
    },
    pay: {
      type: DataType.STRING(32),
      allowNull: false,
    },
    delivery: {
      type: DataType.STRING(32),
      allowNull: false,
    },
    status: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  });

  Order.associate = function({ OrderProducts }) {

    Order.hasMany(OrderProducts, {
      foreignKey: 'orderId',
      as: 'products',
    });
  };

  return Order;
};
