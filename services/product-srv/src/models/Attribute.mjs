
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Attribute extends Model {}

  Attribute.init({
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
    sequelize,
    modelName: 'Attribute',
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
