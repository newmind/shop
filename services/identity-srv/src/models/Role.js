
module.exports = (db, DataType) => {

  const Role = db.define('Role', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    code: {
      type: DataType.STRING(16),
      allowNull: false,
    },
    name: {
      type: DataType.STRING(124),
      allowNull: false,
    },
  }, {
    timestamps: false
  });

  return Role;
};
