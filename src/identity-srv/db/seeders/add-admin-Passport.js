'use strict';

module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.bulkInsert('Passports', [
          {
            userId: 1,
            role: 'admin',
            name: null,
            surname: null,
            birthday: null,
            email: null,
            phone: null,
            address: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ],
        {
          transaction
        });

      await transaction.commit();

    } catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn(
        'Person',
        'petName',
        {
          type: Sequelize.STRING,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};