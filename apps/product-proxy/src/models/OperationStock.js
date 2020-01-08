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
    stockId: {
      type: DataType.INTEGER,
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

  OperationStock.associate = ({ Stock }) => {

    OperationStock.belongsTo(Stock, {
      foreignKey: 'stockId',
      as: 'product',
    });
  };

  return OperationStock;
};
