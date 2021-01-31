
module.exports = (db, DataTypes) => {

  const ProductAttribute = db.define('ProductAttribute', {
    value: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  ProductAttribute.associate = () => {};

  return ProductAttribute;
};
