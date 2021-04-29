
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('OnlinePayments', {
        id: {
          type: DataType.INTEGER,
          autoIncrement: true,
          unique: true,
        },
        orderId: {
          type: DataType.UUID,
          primaryKey: true,
          unique: true,
        },
        paymentUUID: {
          type: DataType.UUID,
          allowNull: false,
          unique: true,
        },
        paymentLink: {
          type: DataType.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataType.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataType.DATE,
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
