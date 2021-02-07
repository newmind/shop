
module.exports = (db, DataType) => {

  const Customer = db.define('Customer', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataType.STRING(64),
      allowNull: false,
    },
    surname: {
      type: DataType.STRING(64),
      allowNull: false,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
    },
    phone: {
      type: DataType.STRING,
      allowNull: false,
    },
    address: {
      type: DataType.STRING,
      allowNull: false,
    },
    payment: {
      type: DataType.STRING,
      defaultValue: 'cash',
    }
  }, {
    timestamps: false,
  });

  Customer.associate = function() {};

  return Customer;
};
