
module.exports = (db, DataType) => {

  const Product = db.define('Product', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      index: true,
    },
    uuid: {
      type: DataType.STRING(9),
      primaryKey: true,
      allowNull: false,
      index: true,
      unique: 'compositeIndex',
    },
    brand: {
      type: DataType.STRING(255),
      allowNull: false,
      index: true,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: true,
      index: true,
    },
    typeId: {
      type: DataType.INTEGER,
      allowNull: false,
      index: true,
    },
    categoryId: {
      type: DataType.INTEGER,
      allowNull: true,
      index: true,
    },
    currencyId: {
      type: DataType.UUID,
      allowNull: false,
    },
    colorId: {
      type: DataType.INTEGER,
      allowNull: true,
      index: true,
    },
    materialId: {
      type: DataType.INTEGER,
      allowNull: true,
      index: true,
    },
    formId: {
      type: DataType.INTEGER,
      allowNull: true,
      index: true,
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
    amount: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        const amount = this.getDataValue('amount');
        return Number(amount)
      },
    },
    saleAmount: {
      type: DataType.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
      get() {
        const amount = this.getDataValue('saleAmount');
        return amount ? Number(amount) : '';
      },
    },
    count: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    params: {
      type: DataType.ENUM,
      values: ['further'],
      allowNull: true,
    },
  });

  Product.associate = function({ Attribute, Gallery, Category, Type, Material, Form, Color, Currency, Comment }) {

    Product.belongsTo(Currency, {
      foreignKey: 'currencyId',
      as: 'currency',
    });

    Product.belongsTo(Category, {
      sourceKey: 'uuid',
      foreignKey: 'categoryId',
      as: 'category',
    });

    Product.belongsTo(Material, {
      foreignKey: 'materialId',
      as: 'material',
    });

    Product.belongsTo(Color, {
      foreignKey: 'colorId',
      as: 'color',
    });

    Product.belongsTo(Form, {
      foreignKey: 'formId',
      as: 'form',
    });

    Product.belongsTo(Type, {
      foreignKey: 'typeId',
      as: 'type',
    });

    Product.hasMany(Attribute, {
      sourceKey: 'uuid',
      foreignKey: 'productId',
      as: 'attributes',
    });

    Product.hasMany(Gallery, {
      sourceKey: 'uuid',
      foreignKey: 'productId',
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
