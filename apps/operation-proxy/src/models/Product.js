
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
      unique: true,
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
    currencyId: {
      type: DataType.UUID,
      allowNull: false,
    },
  });

  Product.associate = function({ Gallery, Currency }) {

    Product.belongsTo(Currency, {
      foreignKey: 'currencyId',
      as: 'currency',
    });

    Product.hasMany(Gallery, {
      sourceKey: 'uuid',
      foreignKey: 'productId',
      as: 'gallery'
    });
  };

  return Product;
};
