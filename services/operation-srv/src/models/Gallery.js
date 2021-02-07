
module.exports = (db, DataTypes) => {

  const Gallery = db.define('Gallery', {
    uuid: {
      type: DataTypes.STRING(64),
      primaryKey: true,
    },
    productUuid: {
      type: DataTypes.STRING(9),
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  Gallery.associate = ({}) => {};

  return Gallery;
};
