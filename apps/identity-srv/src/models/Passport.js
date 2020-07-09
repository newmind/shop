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
    patronymic: {
      type: DataType.STRING(125),
      allowNull: true,
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
    sex: {
      type: DataType.STRING(32),
      index: true,
      allowNull: true,
    },
    imageId: {
      type: DataType.UUID,
      allowNull: true,
    }
  });

  Passport.associate = ({}) => {};

  return Passport;
};
