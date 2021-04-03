
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataTypes) {
  const { Model } = Sequelize;

  class ProductCategory extends Model {}

  ProductCategory.init({
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ProductCategory',
    timestamps: false,
  });

  ProductCategory.associate = () => {};

  return ProductCategory;
};
