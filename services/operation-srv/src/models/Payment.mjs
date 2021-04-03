
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Payment extends Model {}

  Payment.init({
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    code: {
      type: DataType.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
      defaultValue: ''
    },
    isUse: {
      type: DataType.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Payment',
    timestamps: false,
  });

  Payment.associate = () => {};

  return Payment;
};
