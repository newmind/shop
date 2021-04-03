
import { Sequelize } from '@sys.packages/db';


export default function(sequelize) {
  const { Model } = Sequelize;

  class ProductPromotion extends Model {}

  ProductPromotion.init({}, {
    sequelize,
    modelName: 'ProductPromotion',
    timestamps: false,
  });

  ProductPromotion.associate = () => {};

  return ProductPromotion;
};
