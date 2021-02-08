
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Galleries', {
        uuid: {
          type: DataType.STRING(64),
          primaryKey: true,
        },
        productUuid: {
          type: DataType.STRING(9),
        },
        order: {
          type: DataType.INTEGER,
          defaultValue: 1,
          allowNull: false,
        },
      }, {
        transaction
      });

      await transaction.commit();
    }
    catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await transaction.commit();
    }
    catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
};
