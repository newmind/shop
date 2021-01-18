
module.exports = (db) => {

  const ProductColor = db.define('ProductColor', {}, {
    timestamps: false,
  });

  ProductColor.associate = () => {};

  return ProductColor;
};
