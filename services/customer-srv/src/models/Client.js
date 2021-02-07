
module.exports = (db, DataType) => {

  const Client = db.define('Client', {
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
      allowNull: false,
    },
    surname: {
      type: DataType.STRING(32),
      allowNull: false,
    },
    gender: {
      type: DataType.STRING(16),
      allowNull: true,
    },
    age: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    birthday: {
      type: DataType.DATE,
      allowNull: true,
    }
  }, {
    timestamps: false,
  });

  Client.associate = ({ ClientAddress }) => {

    Client.hasOne(ClientAddress, {
      foreignKey: 'clientId',
      as: 'address',
    });
  };

  return Client;
};
