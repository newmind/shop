
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
    type: {
      type: DataType.STRING,
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

  Attribute.associate = ({ Unit, ProductAttribute }) => {

    Attribute.hasOne(ProductAttribute, {
      foreignKey: 'attributeId',
      as: 'product_attribute',
    })

    Attribute.belongsTo(Unit, {
      as: 'unit'
    });
  };

  return Attribute;
};
