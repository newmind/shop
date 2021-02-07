
module.exports = (db, DataType) => {

  const Currency = db.define('Currency', {
    id: {
      type: DataType.INTEGER,
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
