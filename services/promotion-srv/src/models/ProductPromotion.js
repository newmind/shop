
module.exports = (db, DataTypes) => {

  const ProductPromotion = db.define('ProductPromotion', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    promotionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productUuid: {
      type: DataTypes.STRING(9),
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  ProductPromotion.associate = ({ Promotion }) => {

    ProductPromotion.belongsTo(Promotion, {
      foreignKey: 'promotionId',
      as: 'promotions',
    });
  };

  return ProductPromotion;
};
