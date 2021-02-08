
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Currencies', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        value: {
          type: DataType.STRING(8),
          allowNull: false,
        },
        code: {
          type: DataType.STRING(8),
          allowNull: false,
        },
        description: {
          type: DataType.STRING(1024),
        }
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
