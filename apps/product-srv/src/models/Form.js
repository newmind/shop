
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

  Form.associate = ({ Product, ProductForm }) => {

    Form.belongsToMany(Product, {
      through: ProductForm,
      foreignKey: 'formId',
      otherKey: 'productUuid',
      as: 'forms',
    });

    Form.hasMany(ProductForm, {
      foreignKey: 'formId',
      as: 'product_forms',
    });
  };

  return Form;
};
