
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
    },
    imageId: {
      type: DataType.UUID,
      allowNull: true,
    },
  });

  Category.associate = ({ Product, ProductCategory }) => {

    Category.belongsToMany(Product, {
      through: ProductCategory,
      foreignKey: 'categoryId',
      otherKey: 'productUuid',
      as: 'categories',
    });

    Category.hasMany(ProductCategory, {
      foreignKey: 'categoryId',
      as: 'product_categories',
    });
  };

  return Category;
};
