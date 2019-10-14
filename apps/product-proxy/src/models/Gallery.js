'use strict';

module.exports = (db, DataType) => {

  const Gallery = db.define('Gallery', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    file: {
      type: DataType.BLOB,
    }
  });

  Gallery.associate = ({}) => {};

  return Gallery;
};
