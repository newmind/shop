'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Attributes', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        productId: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'Units',
              schema: 'schema'
            },
            key: 'id'
          },
          allowNull: false
        },
        name: {
          type: Sequelize.STRING(256),
        },
        value: {
          type: Sequelize.STRING(256),
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