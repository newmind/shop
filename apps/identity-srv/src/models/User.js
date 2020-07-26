'use strict';

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

  User.associate = ({ Passport }) => {

    Passport.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  // User.sync({ force: true });

  return User;
};
