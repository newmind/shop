
module.exports = (db, DataType) => {

  const Status = db.define('Status', {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    code: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
      defaultValue: ''
    }
  }, {
    timestamps: false,
  });

  Status.associate = () => {};

  return Status;
};
