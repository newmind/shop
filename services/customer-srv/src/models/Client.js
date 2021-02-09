
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
      allowNull: true,
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

  Client.associate = ({ Address }) => {

    Client.hasOne(Address, {
      foreignKey: 'clientId',
      as: 'address',
    });
  };

  return Client;
};
