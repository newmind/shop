
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
          allowNull: false,
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

      await queryInterface.createTable('ClientAddresses', {
        clientId: {
          type: DataType.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        postcode: {
          type: DataType.INTEGER,
          allowNull: true,
        },
        country: {
          type: DataType.STRING(32),
          allowNull: true,
          defaultValue: 'Россия',
        },
        region: {
          type: DataType.STRING(32),
          allowNull: true,
        },
        district: {
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
        home: {
          type: DataType.STRING(32),
          allowNull: true,
        },
        float: {
          type: DataType.STRING(32),
          allowNull: true,
        },
        flat: {
          type: DataType.STRING(32),
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
