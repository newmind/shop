
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Comment extends Model {}

  Comment.init({
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
  }, {
    sequelize,
    modelName: 'Comment',
  });

  Comment.associate = ({ Product }) => {

    Comment.belongsTo(Product, {
      foreignKey: 'productId',
      as: 'product',
    });
  };

  return Comment;
};
