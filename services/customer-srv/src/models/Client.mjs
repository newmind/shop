
import { Sequelize } from '@sys.packages/db';

export default function (sequelize, DataType) {
  const { Model } = Sequelize;

  class Client extends Model {}

  Client.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING(32),
      allowNull: false,
    },
    patronymic: {
      type: DataType.STRING(32),
      allowNull: true,
    },
    surname: {
      type: DataType.STRING(32),
      allowNull: false,
    },
    gender: {
      type: DataType.ENUM,
      values: ['male', 'female'],
    },
    age: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    birthday: {
      type: DataType.DATE,
      allowNull: true,
    },
    isSystem: {
      type: DataType.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Client',
  });

  Client.associate = ({ Address, Meta }) => {

    Client.hasOne(Address, {
      foreignKey: 'clientId',
      as: 'address',
    });

    Client.hasOne(Meta, {
      foreignKey: 'clientId',
      as: 'meta',
    });
  };

  return Client;
};
