
import { UUID } from '@sys.packages/utils';
import request from '@sys.packages/request';
import { models, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const data = ctx['request']['body'];
  const { Order, Product, Currency, Payment, Delivery, Status } = models;

  const { data: customer } = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'post',
    data: {
      name: data['name'],
      patronymic: data['patronymic'],
      surname: data['surname'],
      email: data['email'],
      phone: data['phone'].replace('+', ''),
      address: data['address'],
    }
  });

  const { data: amount } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products/amount',
    method: 'post',
    data: {
      uuid: data['items'],
    }
  });

  const transaction = await sequelize.transaction();

  const order = await Order.create({
    externalId: UUID(),
    customerId: customer['id'],
    paymentCode: data['payment'],
    deliveryCode: data['delivery'],
    currencyCode: amount[0][0],
    statusCode: 100,
    price: amount[0][1],
  }, {
    toJSON: true,
    transaction,
  });

  const products = [];
  for (let index in data['items']) {
    if (data['items'].hasOwnProperty(index)) {
      const item = data['items'][index];

      const { data: product } = await request({
        url: process.env['PRODUCT_API_SRV'] + '/products',
        method: 'get',
        params: {
          uuid: item[0],
        },
      });

      if ( !! product.length) {
        products.push({
          orderId: order['id'],
          uuid: product[0]['uuid'],
          fiscal: product[0]['fiscal'],
          price: product[0]['price'],
          currencyCode: product[0]['currency']['code'],
          count: item[1],
        });
      }
    }
  }

  await Product.bulkCreate(products, {
    transaction,
  });

  await transaction.commit();

  const result = await Order.findOne({
    where: { id: order['id'] },
    attributes: ['externalId', 'customerId', 'price', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Currency,
        required: true,
        as: 'currency',
        attributes: ['code', 'value'],
      },
      {
        model: Product,
        required: true,
        as: 'products',
        attributes: ['uuid', 'fiscal', 'price'],
        include: [
          {
            model: Currency,
            required: true,
            as: 'currency',
            attributes: ['code', 'value'],
          },
        ],
      },
      {
        model: Payment,
        required: true,
        as: 'payment',
        attributes: ['code', 'name'],
      },
      {
        model: Delivery,
        required: true,
        as: 'delivery',
        attributes: ['code', 'name'],
      },
      {
        model: Status,
        required: true,
        as: 'status',
        attributes: ['code', 'name'],
      }
    ]
  });

  // const body = {
  //   externalId,
  //   amount: fields['amount'],
  //   currency: 'RUB',
  //   description: 'test',
  //   customerPhone: fields['phone'],
  //   customerEmail: fields['email'],
  //   customData: {
  //     name: fields['name'],
  //     surname: fields['surname'],
  //     address: fields['address'].replace(/[,]/g, ''),
  //   },
  //   successUrl: `https://магазиночков.рф/order/${externalId}`,
  //   failUrl: "https://магазиночков.рф/order",
  //   deliveryMethod: "EMAIL",
  // };
  //
  // const bodyWithSalt = JSON.stringify(body) + process.env['PIKASSA_SECRET_KEY'];
  // const hash = createHash('md5').update(bodyWithSalt).digest();
  // const sign = hash.toString('base64');
  //
  // const invoice = await request({
  //   url: process.env['PIKASSA_API_URL'] + '/invoices',
  //   method: 'post',
  //   headers: {
  //     'X-Sign': sign,
  //     'X-Api-Key': process.env['PIKASSA_API_KEY'],
  //     'Content-Type': 'application/json; charset=utf-8',
  //   },
  //   data: body,
  // });
  //
  // const { Order, OrderProducts, Currency, Product, Gallery, Status, Prescription } = models;
  // const transaction = await sequelize.transaction();
  //
  // const { id } = await Order.create({
  //   externalId,
  //   currencyId: fields['items'][0]['currencyId'],
  //   invoiceId: invoice['data']['uuid'],
  //   paymentLink: invoice['data']['paymentLink'],
  //   statusCode: 1,
  //   pay: fields['pay'],
  //   name: fields['name'],
  //   phone: fields['phone'],
  //   email: fields['email'],
  //   surname: fields['surname'],
  //   address: fields['address'],
  //   delivery: fields['delivery'],
  //   amount: fields['amount'],
  // }, {
  //   transaction,
  // });
  //
  // const products = fields['items'];
  // for (let index in products) {
  //   if (products.hasOwnProperty(index)) {
  //     const product = products[index];
  //     const { id: orderProductId } = await OrderProducts.create({
  //       orderId: id,
  //       productId: product['productId'],
  //       currencyId: product['currencyId'],
  //       type: product['type'],
  //       amount: product['amount'],
  //     }, {
  //       transaction
  //     });
  //
  //     if (product['recipe']) {
  //       await Prescription.create({
  //         orderId: orderProductId,
  //         ...product['recipe'],
  //       }, {
  //         transaction,
  //       });
  //     }
  //   }
  // }
  //
  // await transaction.commit();
  //
  // const operations = await Order.findAll({
  //   where: { externalId },
  //   order: [['createdAt', 'desc']],
  //   attributes: ['externalId', 'address', 'email', 'phone', 'name', 'surname', 'amount', 'pay', 'delivery', 'createdAt', 'updatedAt'],
  //   include: [
  //     {
  //       model: Currency,
  //       required: false,
  //       as: 'currency',
  //       attributes: ['uuid', 'value']
  //     },
  //     {
  //       model: Status,
  //       required: false,
  //       as: 'status',
  //       attributes: ['code', 'name']
  //     },
  //     {
  //       model: OrderProducts,
  //       required: true,
  //       as: 'products',
  //       attributes: ['id', 'type', 'amount'],
  //       include: [
  //         {
  //           model: Prescription,
  //           required: false,
  //           as: 'recipe',
  //           attributes: ['PDLeft', 'PDRight', 'sphRight', 'sphLeft', 'cylRight', 'cylLeft', 'axisRight', 'axisLeft', 'addRight', 'addLeft']
  //         },
  //         {
  //           model: Currency,
  //           required: true,
  //           as: 'currency',
  //           attributes: ['uuid', 'value']
  //         },
  //         {
  //           model: Product,
  //           attributes: ['uuid', 'name', 'brand'],
  //           required: true,
  //           as: 'product',
  //           include: [
  //             {
  //               model: Currency,
  //               required: false,
  //               as: 'currency',
  //               attributes: ['uuid', 'value']
  //             },
  //             {
  //               model: Gallery,
  //               required: false,
  //               as: 'gallery',
  //               attributes: ['externalId'],
  //             },
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // });
  //
  // await sendEvent(process.env['RABBIT_OPERATION_SRV_EXCHANGE_ORDER_CREATED'], JSON.stringify(operations[0]));
  //
  // console.log(operations[0].toJSON()['products']);

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
