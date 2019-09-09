'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Comments', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        evaluation: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        person: {
          type: Sequelize.STRING(126),
        },
        comment: {
          type: Sequelize.STRING(1024),
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