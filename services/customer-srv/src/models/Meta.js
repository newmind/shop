
module.exports = (db, DataType) => {

  const Meta = db.define('Meta', {
    clientId: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataType.STRING(124),
      allowNull: true,
    },
    phone: {
      type: DataType.STRING(14),
      allowNull: true,
    },
  }, {
    timestamps: false,
  });

  Meta.associate = ({ Client }) => {

    Meta.belongsTo(Client, {
      as: 'client',
    });
  };

  return Meta;
};
