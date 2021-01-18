
module.exports = (db) => {

  const ProductForm = db.define('ProductForm', {}, {
    timestamps: false,
  });

  ProductForm.associate = ({ ProductType }) => {

    ProductForm.belongsTo(ProductType, {
      foreignKey: 'productUuid',
      sourceKey: 'productUuid',
    });
  };

  return ProductForm;
};
