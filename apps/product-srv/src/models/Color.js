
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

  Color.associate = ({ Product }) => {

    Color.hasMany(Product, {
      foreignKey: 'colorId',
      as: 'product',
    });
  };

  return Color;
};
