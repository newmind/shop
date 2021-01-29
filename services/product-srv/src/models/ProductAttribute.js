
module.exports = (db, DataTypes) => {

  const ProductAttribute = db.define('ProductAttribute', {
    value: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
  }, {
    timestamps: false,
  });

  ProductAttribute.associate = () => {};

  return ProductAttribute;
};
