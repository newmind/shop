
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Shop extends Model {}

  Shop.init({
    uuid: {
      type: DataType.STRING(64),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataType.STRING(256),
      allowNull: false,
    },
    address: {
      type: DataType.STRING(256),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(2048),
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'Shops',
    timestamps: true,
  });

  Shop.associate = () => {};

  return Shop;
};
