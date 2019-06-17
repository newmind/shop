'use strict';

module.exports = (db, DataType) => {

  const ProductAttribute = db.define('ProductAttribute', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataType.INTEGER,
      foreignKey: true,
    },
    attributeId: {
      type: DataType.INTEGER,
      foreignKey: true,
    }
  });

  ProductAttribute.associate = () => {};

  // ProductAttribute.sync({ force: true });

  return ProductAttribute;
};
