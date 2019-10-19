'use strict';

module.exports = (db, DataType) => {

  const Product = db.define('Product', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: true,
    },
    brand: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    color: {
      type: DataType.STRING(255),
      allowNull: true,
    },
    form: {
      type: DataType.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataType.STRING(1024),
      allowNull: true,
    },
    status: {
      type: DataType.INTEGER,
      defaultValue: 1,
    },
  });

  Product.associate = function({ Attribute, Gallery, Stock }) {

    Product.hasOne(Stock, {
      foreignKey: 'productId',
      as: 'stock',
    });

    Product.hasMany(Attribute, {
      foreignKey: 'productId',
      as: 'attributes',
    });

    Product.hasMany(Gallery, {
      foreignKey: 'productId',
      as: 'gallery'
    })
  };

  return Product;
};
