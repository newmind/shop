
module.exports = (db, DataType) => {

  const Status = db.define('Status', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      index: true,
    },
    code: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataType.STRING(128),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(2024),
      defaultValue: ''
    }
  });

  Status.associate = () => {};

  return Status;
};
