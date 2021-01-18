
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.removeColumn('Products', 'typeId', { transaction });
      await queryInterface.removeColumn('Products', 'categoryId', { transaction });
      await queryInterface.removeColumn('Products', 'colorId', { transaction });
      await queryInterface.removeColumn('Products', 'materialId', { transaction });
      await queryInterface.removeColumn('Products', 'formId', { transaction });

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
