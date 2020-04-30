'use strict';

module.exports = (db, DataType) => {

  const Comment = db.define('Comment', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    productId: {
      type: DataType.STRING(9),
      allowNull: false,
    },
    evaluation: {
      type: DataType.INTEGER,
      defaultValue: 0,
    },
    person: {
      type: DataType.STRING(126),
    },
    comment: {
      type: DataType.STRING(1024),
    },
  });

  Comment.associate = ({ Product }) => {

    Comment.belongsTo(Product, {
      foreignKey: 'productId',
      as: 'product',
    });
  };

  return Comment;
};
