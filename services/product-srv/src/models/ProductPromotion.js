
module.exports = (db) => {

  const ProductPromotion = db.define('ProductPromotion', {}, {
    timestamps: false,
  });

  ProductPromotion.associate = () => {};

  return ProductPromotion;
};
