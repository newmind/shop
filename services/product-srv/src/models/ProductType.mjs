
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataTypes) {
  const { Model } = Sequelize;

  class ProductType extends Model {}

  ProductType.init({
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ProductType',
    timestamps: false,
  });

  ProductType.associate = () => {};

  return ProductType;
};
