
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataTypes) {
  const { Model } = Sequelize;

  class ProductPromotion extends Model {}

  ProductPromotion.init({
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
    sequelize,
    modelName: 'ProductPromotion',
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
