
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
          type: DataType.STRING(16),
          allowNull: true,
        },
        age: {
          type: DataType.INTEGER,
          allowNull: true,
        },
        birthday: {
          type: DataType.DATE,
          allowNull: true,
        }
      }, {
        transaction,
      });

      await queryInterface.createTable('Addresses', {
        clientId: {
          type: DataType.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        postalCode: {
          type: DataType.INTEGER,
          allowNull: true,
        },
        country: {
          type: DataType.STRING(32),
          allowNull: true,
          defaultValue: 'Россия',
        },
        province: {
          type: DataType.STRING(32),
          allowNull: true,
        },
        locality: {
          type: DataType.STRING(32),
          allowNull: true,
        },
        street: {
          type: DataType.STRING(32),
          allowNull: true,
        },
        house: {
          type: DataType.STRING(32),
          allowNull: true,
        },
        entrance: {
          type: DataType.INTEGER,
          allowNull: true,
        },
        floor: {
          type: DataType.INTEGER,
          allowNull: true,
        },
        flat: {
          type: DataType.STRING(8),
          allowNull: true,
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
