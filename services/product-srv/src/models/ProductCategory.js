
module.exports = (db, DataTypes) => {

  const ProductCategory = db.define('ProductCategory', {
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  ProductCategory.associate = () => {};

  return ProductCategory;
};
