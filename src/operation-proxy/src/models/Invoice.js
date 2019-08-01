'use strict';

module.exports = (db, DataType) => {

  const Invoice = db.define('Invoice', {
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
    paymentMethodId: {
      type: DataType.INTEGER,
    },
    amount: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
    },
    currencyId: {
      type: DataType.INTEGER,
    },
    statusCode: {
      type: DataType.INTEGER(2),
      allowNull: false,
    }
  });

  return Invoice;
};
