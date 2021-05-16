
import { Sequelize } from '@sys.packages/db';


export default function (sequelize, DataTypes) {
  const { Model } = Sequelize;

  class CharacteristicAttribute extends Model {}

  CharacteristicAttribute.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    characteristicId: {
      type: DataTypes.INTEGER,
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
    modelName: 'CharacteristicAttribute',
    timestamps: false,
  });

  CharacteristicAttribute.associate = ({ Characteristic, Attribute }) => {

    CharacteristicAttribute.belongsTo(Characteristic, {
      foreignKey: 'characteristicId',
      as: 'characteristic',
    });

    CharacteristicAttribute.belongsTo(Attribute, {
      foreignKey: 'attributeId',
      as: 'attribute',
    });
  };

  return CharacteristicAttribute;
};
