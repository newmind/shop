
import { Sequelize } from '@sys.packages/db';


export default function (sequelize, DataType) {
  const { Model } = Sequelize;

  class User extends Model {}

  User.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    login: {
      type: DataType.STRING(125),
      index: true,
      unique: true,
    },
    password: {
      type: DataType.STRING(255),
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = function({ Role, UserCustomer, UserRole }) {

    User.hasOne(UserCustomer, {
      foreignKey: 'userId',
      as: 'customer',
    });

    User.belongsToMany(Role, {
      through: UserRole,
      foreignKey: 'userId',
      otherKey: 'roleId',
      as: 'role',
    });
  };

  return User;
};
