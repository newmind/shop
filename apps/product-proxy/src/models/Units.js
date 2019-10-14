'use strict';

module.exports = (db, DataType) => {

  const Unit = db.define('Unit', {
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

  Unit.associate = () => {};

  return Unit;
};
