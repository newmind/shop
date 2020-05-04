
module.exports = (db, DataType) => {

  const Product = db.define('Product', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      index: true,
    },
    uuid: {
      type: DataType.STRING(9),
      primaryKey: true,
      allowNull: false,
      index: true,
      unique: 'compositeIndex',
    },
    promo: {
      type: DataType.BLOB,
      allowNull: true,
      defaultValue: null,
    },
    brand: {
      type: DataType.STRING(255),
      allowNull: false,
      index: true,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: true,
      index: true,
    },
    amount: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        const amount = this.getDataValue('amount');
        return Number(amount)
      },
    },
    currency: {
      type: DataType.STRING(16),
      allowNull: false,
    },
    params: {
      type: DataType.ENUM,
      values: ['further'],
      allowNull: true,
    },
  });

  Product.associate = function() {};

  return Product;
};
