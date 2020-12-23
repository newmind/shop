
module.exports = (db, DataType) => {

  const Currency = db.define('Currency', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      index: true,
    },
    uuid: {
      type: DataType.UUID,
      primaryKey: true,
      unique: true,
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
  });

  Currency.associate = () => {};

  return Currency;
};
