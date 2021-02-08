
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Galleries', {
        uuid: {
          type: Sequelize.STRING(40),
          primaryKey: true,
          index: true,
          unique: true,
        },
        small: {
          type: Sequelize.BLOB,
        },
        middle: {
          type: Sequelize.BLOB,
        },
        large: {
          type: Sequelize.BLOB,
        }
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
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
