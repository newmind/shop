
module.exports = (db, DataType) => {

  const Attribute = db.define('Attribute', {
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
    unitId: {
      type: DataType.INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: false,
  });

  Attribute.associate = ({ Units, ProductAttribute }) => {

    Attribute.hasOne(ProductAttribute, {
      as: 'attribute'
    });

    Attribute.belongsTo(Units, {
      as: 'unit'
    });
  };

  return Attribute;
};
