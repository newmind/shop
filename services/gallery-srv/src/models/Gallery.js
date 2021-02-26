
module.exports = (db, DataType) => {

  const Gallery = db.define('Gallery', {
    uuid: {
      type: DataType.STRING(40),
      primaryKey: true,
      index: true,
      unique: true,
    },
    name: {
      type: DataType.STRING(32),
      allowNull: true,
    },
    small: {
      type: DataType.BLOB,
    },
    middle: {
      type: DataType.BLOB,
    },
    large: {
      type: DataType.BLOB,
    },
  }, {
    timestamps: true,
  });

  Gallery.associate = ({}) => {};

  return Gallery;
};
