
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Currency extends Model {}

  Currency.init({
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    code: {
      type: DataType.STRING(8),
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataType.STRING(8),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
    }
  }, {
    sequelize,
    modelName: 'Currency',
    timestamps: false,
  });

  Currency.associate = () => {};

  return Currency;
};
