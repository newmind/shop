
module.exports = (db, DataType) => {

  const Form = db.define('Form', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    value: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
      defaultValue: ''
    }
  });

  Form.associate = ({ Product }) => {

    Form.hasMany(Product, {
      foreignKey: 'formId',
      as: 'product',
    });
  };

  return Form;
};
