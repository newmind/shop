'use strict';

module.exports = (db, DataType) => {

  const Category = db.define('Type', {
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

  Category.associate = () => {};

  return Category;
};
