
module.exports = (db, DataTypes) => {

  const Promotion = db.define('Promotion', {
    uuid: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    percent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dateFrom: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateTo: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    timestamps: false,
  });

  Promotion.associate = ({ Product, ProductPromotion }) => {

    Promotion.belongsToMany(Product, {
      through: ProductPromotion,
      foreignKey: 'promotionUuid',
      otherKey: 'productUuid',
      as: 'products',
    });
  };

  return Promotion;
};
