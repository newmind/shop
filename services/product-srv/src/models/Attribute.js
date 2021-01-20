
module.exports = (db, DataType) => {

  const Attribute = db.define('Attribute', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    productId: {
      type: DataType.STRING(9),
    },
    unitId: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataType.STRING(256),
    },
    value: {
      type: DataType.STRING(256),
    },
  });

  Attribute.associate = ({ Units }) => {

    Attribute.belongsTo(Units, {
      as: 'unit'
    });
  };

  return Attribute;
};
