'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const __dirname = process.cwd();

const sequelize = new Sequelize(
  process.env['DATA_BASE_NAME'],
  process.env['DATA_BASE_USERNAME'],
  process.env['DATA_BASE_PASSWORD'],
  {
    port: process.env['DATA_BASE_PORT'],
    host: process.env['DATA_BASE_HOST'],
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });

export default () => {

  let models = {};

  console.log(111, path.resolve(__dirname, 'src/models'));

  fs.readdirSync(path.resolve(__dirname, 'src/models'))
    .forEach((filename) => {
      console.log(filename);
      const model = {};
      model.path = path.join(__dirname, 'models/', filename);
      model.name = filename.replace(/\.[^/.]+$/, "");
      model.resource = sequelize.import(model.path);
      // model.service = epilogue.resource({model: model.resource});
      models[model.name] = model;
    });


  sequelize.sync()
    .then(() => console.log('Database connected'));
}
