
import { Sequelize } from '@sys.packages/db';


export default function(sequelize) {
  const { Model } = Sequelize;

  class UserRole extends Model {}

  UserRole.init({}, {
    sequelize,
    modelName: 'UserRole',
    timestamps: false,
  });

  UserRole.associate = () => {};

  return UserRole;
};
