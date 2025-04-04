import Order from "../models/Order.js";
import OrderProduct from "../models/OrderProduct.js";
// Hier muss getProductById importiert werden, um die Produktinformationen zu erhalten

// Mock data for products
const mockProducts = [
  { id: 1, name: "Product A", price: 100 },
  { id: 2, name: "Product B", price: 200 },
];

// Mock function to simulate fetching a product
const getProductById = async (productId) => {
  return mockProducts.find((product) => product.id === productId) || null;
};

// Dieses Snippet ist eine Dummyfunktion, die Produktinformationen zurückgibt.

// Orders
export const getOrders = async (req, res) => {
  const orders = await Order.findAll({
    include: { model: OrderProduct, as: "products" },
  });
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id, {
    include: { model: OrderProduct, as: "products" },
  });

  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
};

export const createOrder = async (req, res) => {
  const { userId, products } = req.body;

  const order = await Order.create({ userId });

  let total = 0;
  for (const item of products) {
    const product = await getProductById(item.productId);
    if (!product) return res.status(400).json({ error: "Product not found" });

    await OrderProduct.create({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
    });

    total += product.price * item.quantity;
  }

  await order.update({ total });

  const newOrder = await Order.findByPk(order.id, {
    include: { model: OrderProduct, as: "products" },
  });

  res.status(201).json(newOrder);
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { products } = req.body;

  const order = await Order.findByPk(id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  await OrderProduct.destroy({ where: { orderId: id } });

  let total = 0;
  for (const item of products) {
    const product = await getProductById(item.productId); // Используем заглушку
    if (!product) return res.status(400).json({ error: "Product not found" });

    await OrderProduct.create({
      orderId: id,
      productId: item.productId,
      quantity: item.quantity,
    });

    total += product.price * item.quantity;
  }

  await order.update({ total });

  const updatedOrder = await Order.findByPk(id, {
    include: { model: OrderProduct, as: "products" },
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
