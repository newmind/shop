
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
    imageId: {
      type: DataType.UUID,
      allowNull: true,
    },
  });

  Type.associate = ({ Product, ProductType }) => {

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
  };

  return Type;
};
