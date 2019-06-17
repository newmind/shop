'use strict';

module.exports = (db, DataType) => {

  const Operation = db.define('Operation', {
    id: {
      type: DataType.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    externalId: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    details: {
      type: DataType.TEXT,
      allowNull: false,
    },
    paymentMethodId: {
      type: DataType.INTEGER,
    },
    amount: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
    },
    statusCode: {
      type: DataType.INTEGER(2),
      allowNull: false,
    }
  });

  return Operation;
};
