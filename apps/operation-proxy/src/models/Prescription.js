
module.exports = (db, DataType) => {

  const Prescription = db.define('Prescription', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    orderId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    PDLeft: {
      type: DataType.STRING(8),
      defaultValue: 'average',
      allowNull: false,
    },
    PDRight: {
      type: DataType.STRING(8),
      defaultValue: 'average',
      allowNull: false,
    },
    sphRight: {
      type: DataType.STRING(8),
      defaultValue: 'plano',
      allowNull: false,
    },
    sphLeft: {
      type: DataType.STRING(8),
      defaultValue: 'plano',
      allowNull: false,
    },
    cylRight: {
      type: DataType.STRING(8),
      defaultValue: 'plano',
      allowNull: false,
    },
    cylLeft: {
      type: DataType.STRING(8),
      defaultValue: 'plano',
      allowNull: false,
    },
    axisRight: {
      type: DataType.STRING(8),
      defaultValue: '0',
      allowNull: false,
    },
    axisLeft: {
      type: DataType.STRING(8),
      defaultValue: '0',
      allowNull: false,
    },
    addRight: {
      type: DataType.STRING(8),
      defaultValue: '0.00',
      allowNull: false,
    },
    addLeft: {
      type: DataType.STRING(8),
      defaultValue: '0.00',
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
      allowNull: true,
    },
  });

  Prescription.associate = function({}) {};

  return Prescription;
};
