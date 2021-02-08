
module.exports = (db, DataType) => {

  const Currency = db.define('Currency', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    value: {
      type: DataType.STRING(8),
      allowNull: false,
    },
    code: {
      type: DataType.STRING(8),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
    }
  }, {
    timestamps: false,
  });

  Currency.associate = () => {};

  return Currency;
};
