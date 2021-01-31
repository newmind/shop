
module.exports = (db, DataTypes) => {

  const ProductType = db.define('ProductType', {
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  ProductType.associate = () => {};

  return ProductType;
};
