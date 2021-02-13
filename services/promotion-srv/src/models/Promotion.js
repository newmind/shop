
module.exports = (db, DataTypes) => {

  const Promotion = db.define('Promotion', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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

  Promotion.associate = ({ ProductPromotion }) => {

    Promotion.hasMany(ProductPromotion, {
      foreignKey: 'promotionId',
      as: 'products',
    });
  };

  return Promotion;
};
