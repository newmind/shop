
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Address extends Model {}

  Address.init({
    clientId: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    postalCode: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    country: {
      type: DataType.STRING(32),
      allowNull: true,
      defaultValue: 'Россия',
    },
    province: {
      type: DataType.STRING(32),
      allowNull: true,
    },
    locality: {
      type: DataType.STRING(32),
      allowNull: true,
    },
    street: {
      type: DataType.STRING(32),
      allowNull: true,
    },
    house: {
      type: DataType.STRING(32),
      allowNull: true,
    },
    entrance: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    floor: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    flat: {
      type: DataType.STRING(8),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Address',
    timestamps: false,
  });

  Address.associate = ({ Client }) => {

    Address.belongsTo(Client, {
      as: 'client',
    });
  };

  return Address;
};
