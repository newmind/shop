
module.exports = (db, DataType) => {

  const Brand = db.define('Brand', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    value: {
      type: DataType.STRING(256),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
      allowNull: true,
    },
  }, {
    timestamps: false,
  });

  Brand.associate = ({ Product, ProductBrand }) => {

    Brand.belongsToMany(Product, {
      through: ProductBrand,
      foreignKey: 'brandId',
      otherKey: 'productUuid',
      as: 'products',
    });
  };

  return Brand;
};
