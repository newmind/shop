
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Meta extends Model {}

  Meta.init({
    clientId: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataType.STRING(124),
      allowNull: true,
    },
    phone: {
      type: DataType.STRING(14),
      allowNull: true,
    },
    address: {
      type: DataType.STRING(255),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Meta',
    timestamps: false,
  });

  Meta.associate = ({ Client }) => {

    Meta.belongsTo(Client, {
      as: 'client',
    });
  };

  return Meta;
};
