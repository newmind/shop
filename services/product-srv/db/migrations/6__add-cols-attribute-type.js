
module.exports = {
  async up(queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.addColumn('Attributes', 'type', {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: 'STRING'
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
