'use strict';

module.exports = (db, DataType) => {

  const OperationStock = db.define('OperationStock', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    operationId: {
      type: DataType.INTEGER,
    },
    productId: {
      type: DataType.STRING(9),
    },
    type: {
      type: DataType.STRING,
    },
    recipe: {
      type: DataType.JSON,
    },
    lens: {
      type: DataType.JSON,
    }
  });

  OperationStock.associate = ({ Product }) => {

    OperationStock.belongsTo(Product, {
      foreignKey: 'productId',
      as: 'product',
    });
  };

  return OperationStock;
};
