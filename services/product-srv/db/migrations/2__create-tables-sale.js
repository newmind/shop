
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Promotions', {
        uuid: {
          type: Sequelize.UUID,
          unique: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(1024),
          allowNull: true,
        },
        percent: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        dateFrom: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        dateTo: {
          type: Sequelize.DATE,
          allowNull: false,
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
