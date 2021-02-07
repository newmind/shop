
module.exports = (db, DataType) => {

  const Product = db.define('Product', {
    uuid: {
      type: DataType.STRING(9),
      primaryKey: true,
      allowNull: false,
      index: true,
      unique: 'compositeIndex',
    },
    fiscal: {
      type: DataType.STRING(255),
      allowNull: true,
      index: true,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: true,
      index: true,
    },
    amount: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        const amount = this.getDataValue('amount');
        return Number(amount)
      },
    },
    currencyId: {
      type: DataType.UUID,
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
      allowNull: true,
    },
    status: {
      type: DataType.INTEGER,
      defaultValue: 1,
      index: true,
    },
  });

  Product.associate = function({ Brand, Gallery, Category, Type, Promotion, ProductBrand, ProductPromotion, ProductType, ProductCategory, ProductAttribute, Currency, Comment }) {

    Product.belongsTo(Currency, {
      foreignKey: 'currencyId',
      as: 'currency',
    });

    Product.belongsToMany(Brand, {
      through: ProductBrand,
      foreignKey: 'productUuid',
      otherKey: 'brandId',
      as: 'brands',
    });

    Product.belongsToMany(Type, {
      through: ProductType,
      foreignKey: 'productUuid',
      otherKey: 'typeId',
      as: 'types',
    });

    Product.belongsToMany(Category, {
      through: ProductCategory,
      foreignKey: 'productUuid',
      otherKey: 'categoryId',
      as: 'categories',
    });

    Product.hasMany(ProductAttribute, {
      foreignKey: 'productUuid',
      sourceKey: 'uuid',
      as: 'attributes',
    });

    Product.belongsToMany(Promotion, {
      through: ProductPromotion,
      foreignKey: 'productUuid',
      otherKey: 'promotionUuid',
      as: 'promotions',
    });

    Product.hasMany(Gallery, {
      primaryKey: 'uuid',
      foreignKey: 'productUuid',
      as: 'gallery'
    });

    Product.hasMany(Comment, {
      sourceKey: 'uuid',
      foreignKey: 'productId',
      as: 'comments'
    });
  };

  return Product;
};
