
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Meta', {
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
