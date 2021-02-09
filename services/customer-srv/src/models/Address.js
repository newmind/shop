
module.exports = (db, DataType) => {

  const Address = db.define('Address', {
    clientId: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    postalCode: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    country: {
      type: DataType.STRING(32),
      allowNull: true,
      defaultValue: 'Россия',
    },
    province: {
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
    house: {
      type: DataType.STRING(32),
      allowNull: true,
    },
    entrance: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    floor: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    flat: {
      type: DataType.STRING(8),
      allowNull: true,
    },
  }, {
    timestamps: false,
  });

  Address.associate = ({ Client }) => {

    Address.belongsTo(Client, {
      as: 'client',
    });
  };

  return Address;
};
