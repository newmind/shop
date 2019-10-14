'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Passports', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          index: true,
          unique: true,
        },
        role: {
          type: Sequelize.STRING,
          defaultValue: 'admin',
          index: true,
        },
        name: {
          type: Sequelize.STRING(125),
          index: true,
        },
        surname: {
          type: Sequelize.STRING(125),
          index: true,
        },
        birthday: {
          type: Sequelize.DATE,
          index: true,
        },
        email: {
          type: Sequelize.STRING(125),
          index: true,
        },
        phone: {
          type: Sequelize.STRING(12),
          index: true,
        },
        address: {
          type: Sequelize.STRING,
          index: true,
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