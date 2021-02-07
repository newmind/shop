
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('Statuses', [
          {
            code: 100,
            name: 'Новый',
            description: '',
          },
          {
            code: 110,
            name: 'Подтвержден',
            description: '',
          },
          {
            code: 200,
            name: 'Оплачен',
            description: '',
          },
          {
            code: 210,
            name: 'Сформирован',
            description: '',
          },
          {
            code: 300,
            name: 'Отправлен по почте',
            description: '',
          },
          {
            code: 310,
            name: 'Передан в курьерскую службу',
            description: '',
          },
          {
            code: 320,
            name: 'Ожидает выдачи',
            description: '',
          },
          {
            code: 400,
            name: 'Завершон',
            description: '',
          },
          {
            code: 500,
            name: 'Отменен',
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
