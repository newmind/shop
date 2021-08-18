
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('ProductShops', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true,
        },
        productUuid: {
          type: DataType.STRING(9),
          allowNull: false,
        },
        shopUuid: {
          type: DataType.STRING(64),
          allowNull: false,
        },
        number: {
          type: DataType.INTEGER,
          defaultValue: 0,
        },
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
