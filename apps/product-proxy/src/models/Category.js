
module.exports = (db, DataType) => {

  const Category = db.define('Category', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    value: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
      defaultValue: ''
    }
  });

  Category.associate = ({ Product }) => {

    Category.hasMany(Product, {
      foreignKey: 'categoryId',
      as: 'product',
    });
  };

  return Category;
};
