
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Attributes', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        value: {
          type: Sequelize.STRING(256),
          unique: true,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(1024),
          allowNull: true,
        },
        unitId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      }, {
        transaction
      });

      await queryInterface.createTable('Categories', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        value: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(1024),
          allowNull: true,
        },
        parentId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      }, {
        transaction
      });

      await queryInterface.createTable('Galleries', {
        uuid: {
          type: Sequelize.STRING(64),
          primaryKey: true,
        },
        productUuid: {
          type: Sequelize.STRING(9),
        },
      }, {
        transaction
      });

      await queryInterface.createTable('Comments', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        productId: {
          type: Sequelize.STRING(9),
          allowNull: false,
        },
        evaluation: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        person: {
          type: Sequelize.STRING(126),
        },
        comment: {
          type: Sequelize.STRING(1024),
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

      await queryInterface.createTable('Currencies', {
        uuid: {
          type: Sequelize.UUID,
          primaryKey: true,
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
      }, {
        transaction
      });

      await queryInterface.createTable('Products', {
        uuid: {
          type: Sequelize.STRING(9),
          primaryKey: true,
          allowNull: false,
          index: true,
          unique: 'compositeIndex',
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
        fiscal: {
          type: Sequelize.STRING(255),
          allowNull: true,
          index: true,
        },
        currencyId: {
          type: Sequelize.UUID,
          allowNull: false,
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
          defaultValue: 0,
          get() {
            const amount = this.getDataValue('amount');
            return Number(amount)
          },
        },
        saleAmount: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true,
          defaultValue: 0,
          get() {
            const amount = this.getDataValue('saleAmount');
            return amount ? Number(amount) : '';
          },
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

      await queryInterface.createTable('Types', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        value: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(1024),
          defaultValue: ''
        },
      }, {
        transaction
      });

      await queryInterface.createTable('Units', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        value: {
          type: Sequelize.STRING(8),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(2024),
          defaultValue: ''
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
