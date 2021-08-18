
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Shop extends Model {}

  Shop.init({
    uuid: {
      type: DataType.STRING(64),
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataType.STRING(256),
      allowNull: false,
    },
    address: {
      type: DataType.STRING(256),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(2048),
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'Shops',
    timestamps: true,
  });

  Shop.associate = ({ Delivery, Payment, ShopDelivery, ShopPayment }) => {

    Shop.belongsToMany(Delivery, {
      through: ShopDelivery,
      foreignKey: 'shopUuid',
      otherKey: 'deliveryCode',
      as: 'deliveries',
    });

    Shop.belongsToMany(Payment, {
      through: ShopPayment,
      foreignKey: 'shopUuid',
      otherKey: 'paymentCode',
      as: 'payments',
    });
  };

  return Shop;
};
