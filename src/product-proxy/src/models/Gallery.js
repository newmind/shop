'use strict';

module.exports = (db, DataType) => {

  const Gallery = db.define('Gallery', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    productId: {
      type: DataType.INTEGER,
    },
    file: {
      type: DataType.STRING(255),
      unique: true,
    },
  });

  Gallery.associate = ({  }) => {

  };

  // Gallery.sync({ force: true });

  return Gallery;
};
