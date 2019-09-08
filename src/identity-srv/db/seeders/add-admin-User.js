'use strict';

module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.bulkInsert('Users', [
          {
            login: 'zemlya911@mail.ru',
            password: '77de38e4b50e618a0ebb95db61e2f42697391659d82c064a5f81b9f48d85ccd5',
            refreshToken: null,
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