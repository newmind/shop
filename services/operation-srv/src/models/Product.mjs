
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Product extends Model {}

  Product.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    orderId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    uuid: {
      type: DataType.STRING(9),
      allowNull: false,
      index: true,
    },
    price: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        return Number(this.getDataValue('price'))
      },
    },
    currencyCode: {
      type: DataType.STRING(8),
      allowNull: false,
    },
    count: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    optionName: {
      type: DataType.STRING(64),
      allowNull: false,
    },
    optionVendor: {
      type: DataType.STRING(64),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Product',
  });

  Product.associate = function({ Currency }) {

    Product.belongsTo(Currency, {
      foreignKey: 'currencyCode',
      as: 'currency',
    });
  };

  return Product;
};
