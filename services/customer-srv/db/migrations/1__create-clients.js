
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Clients', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        name: {
          type: DataType.STRING(32),
          allowNull: false,
        },
        patronymic: {
          type: DataType.STRING(32),
          allowNull: true,
        },
        surname: {
          type: DataType.STRING(32),
          allowNull: false,
        },
        gender: {
          type: DataType.ENUM,
          values: ['male', 'female'],
        },
        age: {
          type: DataType.INTEGER,
          allowNull: true,
        },
        birthday: {
          type: DataType.DATE,
          allowNull: true,
        },
        isSystem: {
          type: DataType.BOOLEAN,
          allowNull: false,
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
        transaction,
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
