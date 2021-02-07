
module.exports = (db, DataType) => {

  const Product = db.define('Product', {
    uuid: {
      type: DataType.STRING(9),
      primaryKey: true,
      allowNull: false,
      index: true,
      unique: 'compositeIndex',
    },
    fiscal: {
      type: DataType.STRING(255),
      allowNull: true,
      index: true,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: true,
      index: true,
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
    description: {
      type: DataType.STRING(1024),
      allowNull: true,
    },
    status: {
      type: DataType.INTEGER,
      defaultValue: 1,
      index: true,
    },
  });

  Product.associate = function({ Order, Gallery, Currency, OrderProduct }) {

    Product.belongsTo(Currency, {
      foreignKey: 'currencyId',
      as: 'currency',
    });

    Product.hasMany(Gallery, {
      primaryKey: 'uuid',
      foreignKey: 'productUuid',
      as: 'gallery'
    });

    Product.belongsToMany(Order, {
      through: OrderProduct,
      foreignKey: 'productUuid',
      otherKey: 'orderUuid',
      as: 'orders',
    });
  };

  return Product;
};
