
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('Payments', [
          {
            code: 'cash',
            name: 'Наличными',
            description: '',
          },
          {
            code: 'online',
            name: 'Онлайн оплата',
            description: '',
          },
          {
            code: 'card',
            name: 'Картой при получении',
            description: '',
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
