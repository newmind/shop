
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('Statuses', [
          {
            code: 1,
            name: 'Новый',
            description: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            code: 10,
            name: 'Подтвержден',
            description: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            code: 20,
            name: 'Сформирован',
            description: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            code: 30,
            name: 'Отправлен',
            description: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            code: 40,
            name: 'Закрыт',
            description: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            code: 50,
            name: 'Отменен',
            description: '',
            createdAt: new Date(),
            updatedAt: new Date(),
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