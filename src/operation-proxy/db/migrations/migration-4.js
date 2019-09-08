'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Person',
        'petSurname',
        {
          type: Sequelize.STRING,
          defaultValue: 'JJJ'
        },
        { transaction }
      );
      await transaction.commit();

    } catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn(
        'Person',
        'petSurname',
        {
          type: Sequelize.STRING,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};