
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class ProductShop extends Model {}

  ProductShop.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    productUuid: {
      type: DataType.STRING(9),
      allowNull: false,
    },
    shopUuid: {
      type: DataType.STRING(64),
      allowNull: false,
    },
    number: {
      type: DataType.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'ProductShop',
    timestamps: false,
  });

  ProductShop.associate = () => {};

  return ProductShop;
};
