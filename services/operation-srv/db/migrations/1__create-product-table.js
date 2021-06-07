
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Products', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        orderId: {
          type: DataType.INTEGER,
          allowNull: false,
        },
        uuid: {
          type: DataType.STRING(9),
          allowNull: false,
          index: true,
        },
        price: {
          type: DataType.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
          get() {
            return Number(this.getDataValue('price'))
          },
        },
        currencyCode: {
          type: DataType.STRING(8),
          allowNull: false,
        },
        count: {
          type: DataType.INTEGER,
          allowNull: false,
        },
        optionName: {
          type: DataType.STRING(64),
          allowNull: false,
        },
        optionVendor: {
          type: DataType.STRING(64),
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
