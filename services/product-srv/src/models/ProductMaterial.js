
module.exports = (db) => {

  const ProductMaterial = db.define('ProductMaterial', {}, {
    timestamps: false,
  });

  ProductMaterial.associate = () => {};

  return ProductMaterial;
};
