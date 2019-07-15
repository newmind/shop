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
      allowNull: false,
    },
    brand: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
      allowNull: false,
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

  // Product.sync({ force: true });

  return Product;
};
