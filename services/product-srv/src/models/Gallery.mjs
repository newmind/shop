
import { Sequelize } from '@sys.packages/db';


export default function (sequelize, DataTypes) {
  const { Model } = Sequelize;

  class Gallery extends Model {}

  Gallery.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    productUuid: {
      type: DataTypes.STRING(9),
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Gallery',
    timestamps: false,
  });

  Gallery.associate = ({}) => {};

  return Gallery;
};
