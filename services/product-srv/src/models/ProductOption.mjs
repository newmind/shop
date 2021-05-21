
import { Sequelize } from '@sys.packages/db';


export default function (sequelize, DataTypes) {
  const { Model } = Sequelize;

  class ProductOption extends Model {}

  ProductOption.init({
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    vendor: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    isTarget: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ProductOption',
    timestamps: false,
  });

  ProductOption.associate = ({ Product }) => {

    ProductOption.belongsTo(Product, {
      foreignKey: 'productUuid',
      as: 'options',
    });
  };

  return ProductOption;
};
