
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Currencies', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          index: true,
        },
        uuid: {
          type: Sequelize.UUID,
          primaryKey: true,
          unique: true,
          allowNull: false,
        },
        value: {
          type: Sequelize.STRING(8),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(2024),
          defaultValue: ''
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        }
      }, {
        transaction
      });

      await queryInterface.createTable('Galleries', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        externalId: {
          type: Sequelize.STRING(36),
        },
        productId: {
          type: Sequelize.STRING(9),
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        }
      }, {
        transaction
      });

      await queryInterface.createTable('Products', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          index: true,
        },
        uuid: {
          type: Sequelize.STRING(9),
          primaryKey: true,
          allowNull: false,
          index: true,
          unique: true,
        },
        brand: {
          type: Sequelize.STRING(255),
          allowNull: false,
          index: true,
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: true,
          index: true,
        },
        currencyId: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        }
      }, {
        transaction
      });

      await queryInterface.createTable('Orders', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        externalId: {
          type: Sequelize.STRING(64),
          allowNull: false,
        },
        invoiceId: {
          type: Sequelize.STRING(64),
          allowNull: false,
        },
        paymentLink: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(512),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(126),
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING(126),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(126),
          allowNull: false,
        },
        surname: {
          type: Sequelize.STRING(126),
          allowNull: false,
        },
        amount: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0.00,
        },
        pay: {
          type: Sequelize.STRING(32),
          allowNull: false,
        },
        delivery: {
          type: Sequelize.STRING(32),
          allowNull: false,
        },
        status: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        statusInvoice: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        }
      }, {
        transaction
      });

      await queryInterface.createTable('OrderProducts', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        orderId: {
          type: Sequelize.INTEGER,
        },
        productId: {
          type: Sequelize.STRING(9),
        },
        type: {
          type: Sequelize.STRING,
        },
        recipe: {
          type: Sequelize.JSON,
        },
        lens: {
          type: Sequelize.JSON,
        },
        amount: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        },
        currencyId: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
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