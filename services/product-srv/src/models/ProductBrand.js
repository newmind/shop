
module.exports = (db) => {

  const ProductBrand = db.define('ProductBrand', {}, {
    timestamps: false,
  });

  ProductBrand.associate = () => {};

  return ProductBrand;
};
