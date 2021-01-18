
module.exports = (db, DataType) => {

  const Color = db.define('Color', {
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
    }
  });

  Color.associate = ({ Product, ProductColor }) => {

    Color.belongsToMany(Product, {
      through: ProductColor,
      foreignKey: 'colorId',
      otherKey: 'productUuid',
      as: 'colors',
    });

    Color.hasMany(ProductColor, {
      foreignKey: 'colorId',
      as: 'product_colors',
    });
  };

  return Color;
};
