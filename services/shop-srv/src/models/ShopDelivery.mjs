
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataTypes) {
  const { Model } = Sequelize;

  class ShopDelivery extends Model {}

  ShopDelivery.init({
    isUse: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ShopDelivery',
    timestamps: false,
  });

  ShopDelivery.associate = () => {};

  return ShopDelivery;
};
