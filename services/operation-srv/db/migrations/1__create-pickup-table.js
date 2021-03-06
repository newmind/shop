
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Pickup', {
        id: {
          type: DataType.INTEGER,
          allowNull: false,
          autoIncrement: true,
        },
        address: {
          type: DataType.STRING,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataType.STRING,
          allowNull: false,
        },
        description: {
          type: DataType.STRING(1024),
          defaultValue: ''
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
