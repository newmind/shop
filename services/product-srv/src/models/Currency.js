
module.exports = (db, DataType) => {

  const Currency = db.define('Currency', {
    uuid: {
      type: DataType.UUID,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataType.STRING(8),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(2024),
      defaultValue: ''
    }
  }, {
    timestamps: false,
  });

  Currency.associate = () => {};

  return Currency;
};
