
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Attributes', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        productId: {
          type: Sequelize.STRING(9),
          allowNull: false
        },
        unitId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING(256),
        },
        value: {
          type: Sequelize.STRING(256),
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
          defaultValue: ''
        },
        imageId: {
          type: Sequelize.UUID,
          allowNull: true,
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

      await queryInterface.createTable('Colors', {
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
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        }
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
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          index: true,
        },
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
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        }
      }, {
        transaction
      });

      await queryInterface.createTable('Forms', {
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

      await queryInterface.createTable('Materials', {
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
        typeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          index: true,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          index: true,
        },
        currencyId: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        colorId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          index: true,
        },
        materialId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          index: true,
        },
        formId: {
          type: Sequelize.INTEGER,
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
        count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        params: {
          type: Sequelize.ENUM,
          values: ['further'],
          allowNull: true,
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
        imageId: {
          type: Sequelize.UUID,
          allowNull: true,
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
