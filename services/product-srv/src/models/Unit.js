
module.exports = (db, DataType) => {

  const Unit = db.define('Unit', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    value: {
      type: DataType.STRING(8),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
      defaultValue: ''
    }
  }, {
    timestamps: false,
  });

  Unit.associate = () => {};

  return Unit;
};
