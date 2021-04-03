
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Type extends Model {}

  Type.init({
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
  }, {
    sequelize,
    modelName: 'Type',
    timestamps: false,
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
