
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.addColumn('Galleries', 'order', {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      }, {
        transaction
      });

      await queryInterface.addColumn('ProductTypes', 'order', {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      }, {
        transaction
      });

      await queryInterface.addColumn('ProductCategories', 'order', {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      }, {
        transaction
      });

      await queryInterface.addColumn('ProductAttributes', 'order', {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
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
