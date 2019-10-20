'use strict';

module.exports = (db, DataType) => {

  const Operation = db.define('Operation', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    externalId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    details: {
      type: DataType.TEXT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    amount: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 1,
    },
    status: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  });

  return Operation;
};
