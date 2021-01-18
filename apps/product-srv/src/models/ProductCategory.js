
module.exports = (db) => {

  const ProductCategory = db.define('ProductCategory', {}, {
    timestamps: false,
  });

  ProductCategory.associate = () => {};

  return ProductCategory;
};
