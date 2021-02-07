
module.exports = (db, DataType) => {

  const Delivery = db.define('Delivery', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    code: {
      type: DataType.STRING,
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

  Delivery.associate = () => {};

  return Delivery;
};
