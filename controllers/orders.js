import Order from "../models/Order.js";
import OrderProduct from "../models/OrderProduct.js";

import Product from "../models/Product.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getOrders = async (req, res) => {
  const orders = await Order.findAll({
    include: [
      {
        model: OrderProduct,
        as: "orderProducts",
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id"],
          },
        ],
      },
    ],
  });

  const formattedOrders = orders.map((order) => ({
    id: order.id,
    userId: order.userId,
    total: order.total,
    products: order.orderProducts.map((orderProduct) => ({
      productId: orderProduct.productId,
      quantity: orderProduct.quantity,
    })),
  }));

  res.json(formattedOrders);
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByPk(id, {
    include: [
      {
        model: OrderProduct,
        as: "orderProducts",
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "price"],
          },
        ],
      },
    ],
  });

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  const formattedOrder = {
    id: order.id,
    userId: order.userId,
    total: order.total,
    products: order.orderProducts.map((orderProduct) => ({
      productId: orderProduct.productId,
      quantity: orderProduct.quantity,
    })),
  };

  res.json(formattedOrder);
};

export const createOrder = async (req, res) => {
  const { userId, products } = req.body;

  const order = await Order.create({ userId });

  if (!order) {
    return res.status(400).json({ message: "Failed to create order" });
  }

  let total = 0;

  for (const item of products) {
    const product = await Product.findByPk(item.productId);

    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID ${item.productId} not found` });
    }

    await OrderProduct.create({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
    });

    total += product.price * item.quantity;
  }

  await order.update({ total });

  const newOrder = await Order.findByPk(order.id, {
    include: { model: Product, as: "products" },
  });

  res.status(201).json(newOrder);
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { products } = req.body;

  const findProductById = async (productId) => {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new ErrorResponse(`Product with ID ${productId} not found`, 404);
    }
    return product;
  };

  const order = await Order.findByPk(id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  await OrderProduct.destroy({ where: { orderId: id } });

  let total = 0;

  for (const item of products) {
    const product = await findProductById(item.productId);
    await OrderProduct.create({
      orderId: id,
      productId: item.productId,
      quantity: item.quantity,
    });

    total += product.price * item.quantity;
  }

  await order.update({ total });

  const updatedOrder = await Order.findByPk(id, {
    include: { model: OrderProduct, as: "orderProducts" },
  });

  res.json(updatedOrder);
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByPk(id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  await OrderProduct.destroy({ where: { orderId: id } });
  await order.destroy();

  res.json({ message: "Order deleted successfully" });
};
