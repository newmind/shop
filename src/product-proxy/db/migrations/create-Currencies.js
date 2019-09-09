'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Currencies', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        value: {
          type: Sequelize.STRING(8),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(2024),
          defaultValue: ''
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        }
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