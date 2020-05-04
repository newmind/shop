
import logger from '@sys.packages/logger';

import fs from 'fs';
import path from 'path';
import Sq from 'sequelize';


export let models = {};
export let sequelize = null;
export const Sequelize = Sq;

const __dirname = process.cwd();


export default async (host) => {

  logger['info']('DB: Создание соединения к базе данных');

  sequelize = new Sq(host, {
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 2000,
      idle: 1000
    },
  });

  logger['info']('DB: Объект базы данных создан');

  await sequelize.authenticate();

  logger['info']('DB: Подключение к базе данный прошло успешно');

  fs.readdirSync(path.resolve(__dirname, 'src/models'))
    .forEach((filename) => {
      const pathModel = path.join(__dirname, 'src/models', filename);
      const name = filename.replace(/\.[^/.]+$/, "");

      logger['info']('DB: добавлена модель: ' + name);

      models[name] = sequelize.import(pathModel);
    });

  Object.keys(models).forEach((modelName) => {
    const model = models[modelName];
    model['associate'] && model['associate'](models);
  });

  await sequelize.sync();

  logger['info']('DB: Синхронизация моделей');

  return true;
}
