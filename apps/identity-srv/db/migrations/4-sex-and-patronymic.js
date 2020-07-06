
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.addColumn('Passports', 'sex', {
        type: Sequelize.STRING(32),
        index: true,
        allowNull: true,
        defaultValue: null,
      }, { transaction });

      await queryInterface.addColumn('Passports', 'patronymic', {
        type: Sequelize.STRING(125),
        allowNull: true,
      }, { transaction });

      await transaction.commit();

    } catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.removeColumn('Passports', 'sex');
      await queryInterface.removeColumn('Passports', 'patronymic');

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};