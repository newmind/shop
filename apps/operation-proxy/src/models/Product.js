'use strict';

module.exports = (db, DataType) => {

  const Product = db.define('Product', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    uuid: {
      type: DataType.STRING(9),
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
    typeId: {
      type: DataType.INTEGER,
      allowNull: false,
      index: true,
    },
    categoryId: {
      type: DataType.INTEGER,
      allowNull: true,
      index: true,
    },
    currencyId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    colorId: {
      type: DataType.INTEGER,
      allowNull: true,
      index: true,
    },
    materialId: {
      type: DataType.INTEGER,
      allowNull: true,
      index: true,
    },
    formId: {
      type: DataType.INTEGER,
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
      allowNull: true,
      defaultValue: 0,
      get() {
        const amount = this.getDataValue('saleAmount');
        return amount ? Number(amount) : '';
      },
    },
    count: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    params: {
      type: DataType.ENUM,
      values: ['further'],
      allowNull: true,
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

  Product.associate = function() { };

  return Product;
};
