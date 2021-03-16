
module.exports = (db) => {

  const UserRole = db.define('UserRole', {}, {
    timestamps: false,
  });

  UserRole.associate = () => {};

  return UserRole;
};
