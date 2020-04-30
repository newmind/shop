
module.exports = (db, DataType) => {

  const Gallery = db.define('Gallery', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    externalId: {
      type: DataType.STRING(36),
    },
    file: {
      type: DataType.BLOB,
    }
  });

  Gallery.associate = ({}) => {};

  return Gallery;
};
