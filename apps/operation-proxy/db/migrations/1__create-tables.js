
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Products', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        uuid: {
          type: Sequelize.STRING(9),
          allowNull: false,
          index: true,
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
        description: {
          type: Sequelize.STRING(1024),
          allowNull: true,
        },
        status: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
          index: true,
        },
        amount: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        saleAmount: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true,
        },
        count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        isHit: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        isSale: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
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

      await queryInterface.createTable('Operations', {
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
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        }
      }, {
        transaction
      });

      await queryInterface.createTable('OperationStocks', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        operationId: {
          type: Sequelize.INTEGER,
        },
        productId: {
          type: Sequelize.INTEGER,
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

    } catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};