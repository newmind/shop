
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class OnlinePayment extends Model {}

  OnlinePayment.init({
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    orderId: {
      type: DataType.UUID,
      primaryKey: true,
      unique: true,
    },
    paymentUUID: {
      type: DataType.UUID,
      allowNull: false,
      unique: true,
    },
    paymentLink: {
      type: DataType.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'OnlinePayment',
  });

  OnlinePayment.associate = () => {};

  return OnlinePayment;
};
