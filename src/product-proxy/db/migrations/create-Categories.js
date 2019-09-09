'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Categories', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(1024),
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