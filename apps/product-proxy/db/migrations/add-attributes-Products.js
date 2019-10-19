'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.addColumn('Products', 'color', {
        type: Sequelize.STRING(255),
        index: true,
        allowNull: true,
        defaultValue: '',
      }, {
        transaction
      });

      await queryInterface.addColumn('Products', 'form', {
        type: Sequelize.STRING(255),
        index: true,
        allowNull: true,
        defaultValue: '',
      }, {
        transaction
      });

      await transaction.commit();

    } catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};