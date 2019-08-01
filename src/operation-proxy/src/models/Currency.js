'use strict';

module.exports = (db, DataType) => {

  const Currency = db.define('Currency', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    value: {
      type: DataType.STRING(8),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(2024),
      defaultValue: ''
    }
  });

  // Currency.sync({ force: true });

  return Currency;
};
