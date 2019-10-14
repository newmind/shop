'use strict';

module.exports = (db, DataType) => {

  const SubProduct = db.define('SubProduct', {
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
  });

  SubProduct.associate = function({ Attribute, Gallery, Stock }) {};

  return SubProduct;
};
