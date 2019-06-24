'use strict';

module.exports = (db, DataType) => {

  const Passport = db.define('Passport', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    cityId: {
      type: DataType.INTEGER,
    },
    userId: {
      type: DataType.INTEGER,
    },
    name: {
      type: DataType.STRING(125),
      index: true,
    },
    surname: {
      type: DataType.STRING(125),
    },
    age: {
      type: DataType.INTEGER,
    },
    email: {
      type: DataType.STRING(125),
    },
    phone: {
      type: DataType.INTEGER(12),
    },
  });

  Passport.associate = ({ User }) => {};

  // Passport.sync({ force: true });

  return Passport;
};
