
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('Deliveries', [
          {
            code: 'post',
            name: 'Почтой',
            description: '',
            isUse: true,
          },
          {
            code: 'pickup',
            name: 'Самовывоз',
            description: '',
            isUse: true,
          },
          {
            code: 'delivery',
            name: 'Курьером',
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
