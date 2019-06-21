'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

let models = {};
const __dirname = process.cwd();

const sequelize = new Sequelize(`postgres://${process.env['DATA_BASE_USERNAME']}:${process.env['DATA_BASE_PASSWORD']}@${process.env['DATA_BASE_HOST']}:${process.env['DATA_BASE_PORT']}/${process.env['DATA_BASE_NAME']}`,
  {
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });


export default () => {

  fs.readdirSync(path.resolve(__dirname, 'src/models'))
    .forEach((filename) => {
      const pathModel = path.join(__dirname, 'src/models', filename);
      const name = filename.replace(/\.[^/.]+$/, "");
      models[name] = sequelize.import(pathModel);
    });

  Object.keys(models).forEach(modelName => {
    const model = models[modelName];
    model['associate'] && model['associate'](models);
  });

  sequelize.sync()
    .then(() => console.log('Database connected'));
}

export {
  models,
  sequelize,
};