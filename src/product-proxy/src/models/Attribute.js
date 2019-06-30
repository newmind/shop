'use strict';

module.exports = (db, DataType) => {

  const Attribute = db.define('Attribute', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    productId: {
      type: DataType.INTEGER,
    },
    name: {
      type: DataType.STRING(256),
    },
    value: {
      type: DataType.STRING(256),
    },
    unitId: {
      type: DataType.INTEGER,
    },
  });

  Attribute.associate = ({ Units }) => {

    Attribute.hasOne(Units, {
      foreignKey: 'id',
      sourceKey: 'unitId',
      as: 'unit',
    });
  };

  // Attribute.sync({ force: true });

  return Attribute;
};
