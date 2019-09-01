'use strict';

module.exports = (db, DataType) => {

  const Passport = db.define('Passport', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    userId: {
      type: DataType.INTEGER,
    },
    role: {
      type: DataType.STRING,
      defaultValue: 'admin',
      index: true,
    },
    name: {
      type: DataType.STRING(125),
      index: true,
    },
    surname: {
      type: DataType.STRING(125),
      index: true,
    },
    birthday: {
      type: DataType.DATE,
      index: true,
    },
    email: {
      type: DataType.STRING(125),
      index: true,
    },
    phone: {
      type: DataType.STRING(12),
      index: true,
    },
    address: {
      type: DataType.STRING,
      index: true,
    },
  });

  Passport.associate = ({}) => {};

  // Passport.sync({ force: true });

  return Passport;
};
