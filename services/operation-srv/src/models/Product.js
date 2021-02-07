
module.exports = (db, DataType) => {

  const Product = db.define('Product', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    orderId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    uuid: {
      type: DataType.STRING(9),
      allowNull: false,
      index: true,
    },
    fiscal: {
      type: DataType.STRING(255),
      allowNull: true,
      index: true,
    },
    price: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        return Number(this.getDataValue('price'))
      },
    },
    currencyId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  });

  Product.associate = function({ Currency }) {

    Product.belongsTo(Currency, {
      foreignKey: 'currencyId',
      as: 'currency',
    });
  };

  return Product;
};
