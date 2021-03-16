
module.exports = (db, DataTypes) => {

  const UserCustomer = db.define('UserCustomer', {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: false,
  });

  UserCustomer.associate = () => {};

  return UserCustomer;
};
