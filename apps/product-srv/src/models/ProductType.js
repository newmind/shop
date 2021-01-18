
module.exports = (db) => {

  const ProductType = db.define('ProductType', {}, {
    timestamps: false,
  });

  ProductType.associate = () => {};

  return ProductType;
};
