
module.exports = (db, DataTypes) => {

  const Gallery = db.define('Gallery', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    productUuid: {
      type: DataTypes.STRING(9),
      allowNull: false,
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
