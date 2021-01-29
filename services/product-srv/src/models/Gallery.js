
module.exports = (db, DataType) => {

  const Gallery = db.define('Gallery', {
    uuid: {
      type: DataType.STRING(64),
      primaryKey: true,
    },
    productUuid: {
      type: DataType.STRING(9),
    },
  }, {
    timestamps: false,
  });

  Gallery.associate = ({}) => {};

  return Gallery;
};
