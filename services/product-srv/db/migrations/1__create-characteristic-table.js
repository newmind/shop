
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Characteristics', {
        id: {
          type: DataType.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        name: {
          type: DataType.STRING(256),
          allowNull: false,
        },
        productUuid: {
          type: DataType.STRING(9),
          index: true,
        },
        order: {
          type: DataType.INTEGER,
          allowNull: false,
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
    }
    catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
};
