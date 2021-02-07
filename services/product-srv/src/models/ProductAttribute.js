
module.exports = (db, DataTypes) => {

  const ProductAttribute = db.define('ProductAttribute', {
    productUuid: {
      type: DataTypes.STRING(9),
      allowNull: false,
    },
    attributeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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

  ProductAttribute.associate = ({ Attribute, Product }) => {

    ProductAttribute.belongsTo(Product, {
      as: 'product',
    });

    ProductAttribute.belongsTo(Attribute, {
      foreignKey: 'attributeId',
      as: 'attribute',
    });
  };

  return ProductAttribute;
};
