
import { Sequelize } from '@sys.packages/db';

export default function(sequelize, DataTypes) {
  const { Model } = Sequelize;

  class UserCustomer extends Model {}

  UserCustomer.init({
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'UserCustomer',
    timestamps: false,
  });

  UserCustomer.associate = () => {};

  return UserCustomer;
};
