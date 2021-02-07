
import logger from '@sys.packages/logger';
import { UUID } from '@sys.packages/utils';

import amqp from 'amqplib/callback_api';


let channelConnect = null;
let offlinePubQueue = [];

const closeOnErr = (err) => {
  if ( ! err) {
    return false;
  }
  logger.error('RabbitMQ: error ' + err);
  return true;
};

const work = (msg, cb) => {
  cb(true);
};


export const connect = (host, cb) => {
  amqp.connect(host,  (error, connection) => {
    if (error) {
      setTimeout(() => connect(host, cb), 1000);
      return;
    }

    connection.on("error", function(err) {
      if (err['message'] !== "Connection closing") {
        logger.error('RabbitMQ: connection closing with ' + err['message']);
      }
      logger.error('RabbitMQ: ' + err['message']);
      cb(err, null);
    });

    connection.on("close", function() {
      logger.warn("RabbitMQ reconnecting");
      return setTimeout(() => connect(host, cb), 1000);
    });

    logger.info('RabbitMQ: connected');
    cb(null, connection);
  });
};

export const channel = (connection, cb) => {
    connection.createChannel((error, channel) => {
      if (closeOnErr(error)) {
        cb(error, null);
      }

      channel.on("error", function(err) {
        logger.error("RabbitMQ: channel error with " + err['message']);
      });

      channel.on("close", function() {
        logger.error("RabbitMQ: channel closed");
      });

      channelConnect = channel;

      while (true) {

        const m = offlinePubQueue.shift();

        if ( ! m) {
          break;
        }

        sendEvent(m[0], m[1], m[2]);
      }

      cb(null, channel);
    });
};

export const connectToRabbit = (host) => {
  return new Promise((resolve, reject) => {
    connect(host, (error, connection) => {
      if (error) {
        return reject(error);
      }
      channel(connection, (error, chanel) => {
        if (error) {
          return reject(error);
        }
        resolve(chanel);
      });
    });
  });
};


export const createExchange = (exchange) => {
  return new Promise((resolve, reject) => {
    channelConnect.assertExchange(exchange, 'fanout', { durable: true }, function(error, _ok) {
      if (error) {
        return reject(error);
      }
      logger.info('RabbitMQ exchanged: ' + exchange);
      resolve(_ok);
    });
  });
};

export const createConsumer = (queue, cb) => {
  return new Promise((resolve, reject) => {
    channelConnect.assertQueue(queue, { durable: true, autoDelete: true }, function(error, _ok) {
      if (error) {
        return reject(error);
      }

      logger.info('RabbitMQ: consumer queue - ' + queue);

      channelConnect.consume(queue, function(message) {
        work(message, (ok) => {
          try {
            if (ok) {
              channelConnect.ack(message);
            } else {
              channelConnect.reject(message, true);
            }

            logger.info(`RabbitMQ: put message (${message.content.toString()}) in queue (${queue})`);

            cb(message.content.toString());
          } catch (e) {
            closeOnErr(e);
            reject(e);
          }
        });
      }, { noAck: false });
      resolve(_ok);
    });
  });
};

export const bindQueueToExchange = (exchange, queue) => {
  return new Promise((resolve, reject) => {
    channelConnect.bindQueue(queue, exchange, '', {}, function(error, _ok) {
      if (error) {
        return reject(error);
      }

      logger.info(`RabbitMQ: bind queue [${queue}] to exchange [${exchange}]`);

      resolve(_ok);
    });
  });
};

export const queueToExchange = async (queue, exchange, cb) => {

  queue = queue + '___' + UUID();

  await createExchange(exchange);
  await createConsumer(queue, cb);
  await bindQueueToExchange(exchange, queue);
};

export const sendEvent = (exchange, content) => {
  return new Promise((resolve, reject) => {
    try {
      content = Buffer.from(content);
      channelConnect.publish(exchange, '', content, { percistent: true });

      logger.info('RabbitMQ: publish to exchange ' + exchange);

      resolve();
    }
    catch(error) {

      logger.error("RabbitMQ:  publish error " + error['message']);

      offlinePubQueue.push([exchange, '', content]);
      channelConnect.connection.close();
      reject();
    }
  });
};
