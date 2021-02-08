
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Products', {
        uuid: {
          type: DataType.STRING(9),
          primaryKey: true,
          allowNull: false,
          index: true,
          unique: 'compositeIndex',
        },
        fiscal: {
          type: DataType.STRING(255),
          allowNull: true,
          index: true,
        },
        name: {
          type: DataType.STRING(255),
          allowNull: true,
          index: true,
        },
        price: {
          type: DataType.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        },
        currencyId: {
          type: DataType.INTEGER,
          allowNull: false,
        },
        description: {
          type: DataType.STRING(1024),
          allowNull: true,
        },
        status: {
          type: DataType.INTEGER,
          defaultValue: 1,
          index: true,
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
