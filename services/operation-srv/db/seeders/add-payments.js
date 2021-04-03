
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('Payments', [
          {
            code: 'cash',
            name: 'Наличными',
            description: '',
            isUse: true,
          },
          {
            code: 'online',
            name: 'Онлайн оплата',
            description: '',
            isUse: true,
          },
          {
            code: 'card',
            name: 'При получении',
            description: '',
            isUse: true,
          },
        ],
        {
          transaction
        });

      await transaction.commit();
    }
    catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
  async down(queryInterface, Sequelize) {

  },
};
