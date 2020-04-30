'use strict';

module.exports = (db, DataType) => {

  const Product = db.define('Product', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      index: true,
    },
    uuid: {
      type: DataType.STRING(9),
      primaryKey: true,
      allowNull: false,
      index: true,
      unique: 'compositeIndex',
    },
    brand: {
      type: DataType.STRING(255),
      allowNull: false,
      index: true,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: true,
      index: true,
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
    amount: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        const amount = this.getDataValue('amount');
        return Number(amount)
      },
    },
    saleAmount: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        const amount = this.getDataValue('saleAmount');
        return amount ? Number(amount) : 0;
      },
    },
    count: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isHit: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
    isSale: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
  });

  Product.associate = function({ Gallery }) {

    Product.hasMany(Gallery, {
      foreignKey: 'productId',
      as: 'gallery'
    });
  };

  return Product;
};
