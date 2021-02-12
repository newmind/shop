
module.exports = (db, DataType) => {

  const Currency = db.define('Currency', {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    code: {
      type: DataType.STRING(8),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    value: {
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
