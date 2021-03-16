
module.exports = (db, DataType) => {

  const User = db.define('User', {
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
  });

  User.associate = ({ Role, UserCustomer, UserRole }) => {

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
