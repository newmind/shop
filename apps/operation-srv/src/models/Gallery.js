
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
      unique: true,
    },
    productId: {
      type: DataType.STRING(9),
    },
  });

  Gallery.associate = () => {};

  return Gallery;
};
