
import { Sequelize } from '@sys.packages/db';


export default function (sequelize) {
  const { Model } = Sequelize;

  class ProductBrand extends Model {}

  ProductBrand.init({}, {
    sequelize,
    modelName: 'ProductBrand',
    timestamps: false,
  });

  ProductBrand.associate = () => {};

  return ProductBrand;
};
