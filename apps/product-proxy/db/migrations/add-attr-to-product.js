'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.addColumn('Products', 'params', {
        type: Sequelize.DataTypes.ENUM('further'),
        allowNull: true,
        after: 'count',
      }, { transaction });

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

      queryInterface.removeColumn('Product', 'params', { transaction });

      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};