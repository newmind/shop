'use strict';

module.exports = (db, DataType) => {

  const Stock = db.define('Stock', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    amount: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const amount = this.getDataValue('amount');
        return Number(amount)
      },
    },
    count: {
      type: DataType.INTEGER,
    }
  });

  Stock.associate = ({ Product, Currency, Category, Comment }) => {

    Stock.belongsTo(Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });

    Stock.belongsTo(Currency, {
      foreignKey: 'currencyId',
      as: 'currency',
    });

    Stock.belongsTo(Product, {
      foreignKey: 'productId',
      as: 'product'
    });
  };

  // Stock.sync({ force: true });

  return Stock;
};
