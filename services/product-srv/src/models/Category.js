
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

  Category.associate = ({ Product, Type, ProductCategory, TypeCategory }) => {

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

    Category.belongsToMany(Type, {
      through: TypeCategory,
      foreignKey: 'categoryId',
      otherKey: 'typeId',
      as: 'types',
    });

    Category.hasMany(TypeCategory, {
      foreignKey: 'categoryId',
      as: 'type_category',
    });

    Category.hasMany(Category, {
      foreignKey: 'parentId',
      as: 'sub-categories',
    });
  };

  return Category;
};
