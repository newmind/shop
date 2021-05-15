
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Product extends Model {}

  Product.init({
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
    price: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        return Number(this.getDataValue('price'))
      },
    },
    currencyCode: {
      type: DataType.STRING(8),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
      allowNull: true,
    },
    isView: {
      type: DataType.INTEGER,
      defaultValue: 1,
      index: true,
    },
  }, {
    sequelize,
    modelName: 'Product'
  });

  Product.associate = function({ Brand, Gallery, Category, Type, Promotion, ProductBrand, ProductPromotion, ProductType, ProductCategory, Characteristic, Currency, Comment }) {

    Product.hasMany(Characteristic, {
      foreignKey: 'productUuid',
      as: 'characteristics',
    });

    Product.belongsTo(Currency, {
      foreignKey: 'currencyCode',
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
