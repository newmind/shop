
module.exports = (db, DataType) => {

  const ClientAddress = db.define('ClientAddress', {
    clientId: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    postcode: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    country: {
      type: DataType.STRING(32),
      allowNull: true,
      defaultValue: 'Россия',
    },
    region: {
      type: DataType.STRING(32),
      allowNull: true,
    },
    district: {
      type: DataType.STRING(32),
      allowNull: true,
    },
    locality: {
      type: DataType.STRING(32),
      allowNull: true,
    },
    street: {
      type: DataType.STRING(32),
      allowNull: true,
    },
    home: {
      type: DataType.STRING(32),
      allowNull: true,
    },
    float: {
      type: DataType.STRING(32),
      allowNull: true,
    },
    flat: {
      type: DataType.STRING(32),
      allowNull: true,
    },
  }, {
    timestamps: false,
  });

  ClientAddress.associate = ({ Client }) => {

    ClientAddress.belongsTo(Client, {
      as: 'client',
    });
  };

  return ClientAddress;
};
