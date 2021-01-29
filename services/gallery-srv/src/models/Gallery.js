
module.exports = (db, DataType) => {

  const Gallery = db.define('Gallery', {
    uuid: {
      type: DataType.STRING(36),
      primaryKey: true,
      index: true,
      unique: true,
    },
    small: {
      type: DataType.BLOB,
    },
    middle: {
      type: DataType.BLOB,
    },
    large: {
      type: DataType.BLOB,
    }
  }, {
    timestamps: false,
  });

  Gallery.associate = ({}) => {};

  return Gallery;
};
