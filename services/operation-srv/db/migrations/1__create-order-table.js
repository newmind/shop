
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Orders', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        externalId: {
          type: DataType.UUID,
          unique: true,
        },
        customerId: {
          type: DataType.INTEGER,
          allowNull: false,
        },
        paymentCode: {
          type: DataType.STRING,
          allowNull: false,
        },
        deliveryCode: {
          type: DataType.STRING,
          allowNull: false,
        },
        currencyCode: {
          type: DataType.STRING(8),
          allowNull: false,
        },
        statusCode: {
          type: DataType.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataType.DECIMAL(10, 2),
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
