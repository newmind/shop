
import {connectToRabbit, queueToExchange} from "@sys.packages/rabbit";

import {updateForm} from "../actions/forms";
import {updateType} from "../actions/types";
import {createComment, deleteComment, updateComment} from "../actions/comments";


export default async function(io) {

  await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);

  await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_COMMENT_CREATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_CREATED'], createComment());
  await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_COMMENT_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_UPDATED'], updateComment());
  await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_COMMENT_DELETED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COMMENT_DELETED'], deleteComment());

  await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_FORM_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_FORM_UPDATED'], updateForm());
  await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_TYPE_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_TYPE_UPDATED'], updateType());
  await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_UNIT_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_UNIT_UPDATED'], payload: JSON.parse(message) }));
  await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_COLOR_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_COLOR_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_COLOR_UPDATED'], payload: JSON.parse(message) }));
  await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_PRODUCT_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_PRODUCT_UPDATED'], payload: JSON.parse(message) }));
  await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_MATERIAL_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_MATERIAL_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_MATERIAL_UPDATED'], payload: JSON.parse(message) }));
  await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_CURRENCY_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_CURRENCY_UPDATED'], payload: JSON.parse(message) }));
  await queueToExchange(process.env['RABBIT_CLIENT_GW_QUEUE_CATEGORY_UPDATED'], process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_UPDATED'], (message) => io.emit('action', { type: process.env['SOCKET_CATEGORY_UPDATED'], payload: JSON.parse(message) }));
}
