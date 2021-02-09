
module.exports = (db, DataType) => {

  const Payment = db.define('Payment', {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    code: {
      type: DataType.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
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

  Payment.associate = () => {};

  return Payment;
};
