
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Shops', {
        uuid: {
          type: DataType.STRING(64),
          primaryKey: true,
          unique: true,
        },
        name: {
          type: DataType.STRING(256),
          allowNull: false,
        },
        address: {
          type: DataType.STRING(256),
          allowNull: false,
        },
        description: {
          type: DataType.STRING(2048),
          allowNull: true,
        },
        createdAt: {
          type: DataType.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataType.DATE,
          allowNull: false,
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
