
import { Sequelize } from '@sys.packages/db';


export default function (sequelize, DataTypes) {
  const { Model } = Sequelize;

  class ProductAttribute extends Model {}

  ProductAttribute.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    productUuid: {
      type: DataTypes.STRING(9),
      allowNull: false,
    },
    attributeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    use: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ProductAttribute',
    timestamps: false,
  });

  ProductAttribute.associate = ({ Attribute, Product }) => {

    ProductAttribute.belongsTo(Product, {
      foreignKey: 'productUuid',
      as: 'product',
    });

    ProductAttribute.belongsTo(Attribute, {
      foreignKey: 'attributeId',
      as: 'attribute',
    });
  };

  return ProductAttribute;
};
