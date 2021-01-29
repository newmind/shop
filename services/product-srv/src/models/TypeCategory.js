
module.exports = (db) => {

  const TypeCategory = db.define('TypeCategory', {}, {
    timestamps: false,
  });

  TypeCategory.associate = () => {};

  return TypeCategory;
};
