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
      type: DataType.STRING,
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
    color: {
      type: DataType.STRING(255),
      allowNull: true,
      index: true,
    },
    material: {
      type: DataType.STRING(255),
      allowNull: true,
      index: true,
    },
    form: {
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
        const amount = this.getDataValue('amount');
        return Number(amount)
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

  Product.associate = function({ Attribute, Gallery, Category, Currency, Comment }) {


    Product.belongsTo(Currency, {
      foreignKey: 'currencyId',
      as: 'currency',
    });

    Product.belongsTo(Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });

    Product.hasMany(Attribute, {
      foreignKey: 'productId',
      as: 'attributes',
    });

    Product.hasMany(Gallery, {
      foreignKey: 'productId',
      as: 'gallery'
    });

    Product.hasMany(Comment, {
      foreignKey: 'productId',
      as: 'comments'
    });
  };

  return Product;
};
