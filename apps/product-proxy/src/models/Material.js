'use strict';

module.exports = (db, DataType) => {

  const Material = db.define('Material', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    value: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
      defaultValue: ''
    }
  });

  Material.associate = ({ Product }) => {

    Material.hasMany(Product, {
      foreignKey: 'materialId',
      as: 'product',
    });
  };

  return Material;
};
