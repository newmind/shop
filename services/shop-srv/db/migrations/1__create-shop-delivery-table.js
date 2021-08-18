
module.exports = {
  async up(queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('ShopDelivery', {
        isUse: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
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
