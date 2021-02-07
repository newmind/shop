
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('Deliveries', [
          {
            code: 'post',
            name: 'Почтой',
            description: '',
          },
          {
            code: 'pickup',
            name: 'Самовывоз',
            description: '',
          },
          {
            code: 'delivery',
            name: 'Доставка курьером',
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
