
module.exports = (db, DataType) => {

  const Type = db.define('Type', {
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
  }, {
    timestamps: false,
  });

  Type.associate = ({ Product, Category, ProductType, TypeCategory }) => {

    Type.belongsToMany(Product, {
      through: ProductType,
      foreignKey: 'typeId',
      otherKey: 'productUuid',
      as: 'products',
    });

    Type.hasMany(ProductType, {
      foreignKey: 'typeId',
      as: 'product_types',
    });

    Type.belongsToMany(Category, {
      through: TypeCategory,
      foreignKey: 'typeId',
      otherKey: 'categoryId',
      as: 'categories',
    });


    Type.hasMany(TypeCategory, {
      foreignKey: 'typeId',
      as: 'type_categories',
    });
  };

  return Type;
};
