
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
      allowNull: true,
    },
    parentId: {
      type: DataType.INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: false,
  });

  Category.associate = ({ Product, ProductCategory }) => {

    Category.belongsToMany(Product, {
      through: ProductCategory,
      foreignKey: 'categoryId',
      otherKey: 'productUuid',
      as: 'products',
    });

    Category.hasMany(ProductCategory, {
      foreignKey: 'categoryId',
      as: 'product_categories',
    });

    Category.hasMany(Category, {
      foreignKey: 'parentId',
      as: 'sub-categories',
    });
  };

  return Category;
};
