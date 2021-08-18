
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataTypes) {
  const { Model } = Sequelize;

  class ShopPayment extends Model {}

  ShopPayment.init({
    isUse: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ShopPayment',
    timestamps: false,
  });

  ShopPayment.associate = () => {};

  return ShopPayment;
};
