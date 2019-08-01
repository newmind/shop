'use strict';

module.exports = (db, DataType) => {

  const Category = db.define('Category', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
      defaultValue: ''
    }
  });

  // Category.sync({ force: true });

  return Category;
};
