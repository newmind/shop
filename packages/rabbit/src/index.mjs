'use strict';

import amqp from 'amqplib/callback_api';


let offlinePubQueue = [];

const closeOnErr = (err) => {
  if ( ! err) return false;
  console.error("[AMQP] error", err);
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
      if (err.message !== "Connection closing") {
        console.error("RabbitMQ connection error", err.message);
      }
      console.log(err);
      cb(err, null);
    });

    connection.on("close", function() {
      console.error("RabbitMQ reconnecting");
      return setTimeout(() => connect(host, cb), 1000);
    });

    console.log('RabbitMQ connected');
    cb(null, connection);
  });
};

export const channel = (connection, cb) => {
    connection.createChannel((error, channel) => {
      if (closeOnErr(error)) {
        cb(error, null);
      }

      channel.on("error", function(err) {
        console.error("RabbitMQ channel error:", err.message);
      });

      channel.on("close", function() {
        console.log("RabbitMQ channel closed");
      });

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

export const createConsumer = (channel, queue, cb) => {
  return new Promise((resolve, reject) => {
    channel.assertQueue(queue, { durable: true, autoDelete: true }, function(error, _ok) {
      if (error) {
        reject(error);
      }
      channel.consume(queue, function(message) {
        work(message, (ok) => {
          try {
            if (ok) {
              channel.ack(message);
            } else {
              channel.reject(message, true);
            }
            cb(message.content.toString());
          } catch (e) {
            closeOnErr(e);
          }
        });
      }, { noAck: false });
      resolve(_ok);
    });
  });
};

export const bindQueueToExchange = (chanel, exchange, queue) => {
  return new Promise((resolve, reject) => {
    chanel.bindQueue(queue, exchange, '', {}, function(error, _ok) {
      if (error) {
        reject(error);
      }
      resolve(_ok);
    });
  });
};

export const createExchange = (channel, exchange) => {
  return new Promise((resolve, reject) => {
    channel.assertExchange(exchange, 'fanout', { durable: true }, function(error, _ok) {
      if (error) {
        reject(error);
      }
      resolve(_ok);
    });
  });
};

export const sendEvent = (channel, exchange, content) => {
  content = Buffer.from(content);
  channel.publish(exchange, '', content, { percistent: true }, function(error) {
    if (error) {
      console.error("RabbitMQ publish error:", error);
      offlinePubQueue.push([exchange, '', content]);
      channel.connection.close();
    }
  });
};
