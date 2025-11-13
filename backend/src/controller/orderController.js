
const Order = require("../schema/OrderSchema");

function createDate() {
  const now = new Date(); 
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); 
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}



exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error 💩" });
  }
};



exports.getOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.createOrder = async (req, res) => {
  const data = req.body;

  if (!data.billing) {
    return res.status(400).json({ error: "Billing information not received" });
  } else {
    try {
      const newOrder = new Order({
        productList: data.productList,
        user: data.user_id,
        restaurante: data.restaurante_id,
        billing: data.billing,
        address: data.address,
        date: createDate(),
      });

      const createdOrder = await newOrder.save();

      return res.status(201).json({
        order: {
          _id: createdOrder._id,
          productList: createdOrder.productList,
          user: createdOrder.user_id,
          restaurante: createdOrder.restaurante_id,
          billing: createdOrder.billing,
          address: createdOrder.address,
          date: createdOrder.date,
        },
      });
    } catch (err) {
      return res.status(500).json({
        error: "Error creating new Order",
        details: err.message,
      });
    }
  }
};



exports.updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const update = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, update, {
      new: true,
    });
    if (updatedOrder) {
      res.json({ message: "Order Updated Succsessfully", updatedOrder });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (deletedOrder) {
      res.json({ message: "order deleted successfully", deletedOrder });
    } else {
      res.status(500).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOrdersByRestaurantId = async (req, res) => {
  const restauranteId = req.params.restauranteId;
  try {
    const orders = await Order.find({ restaurante: restauranteId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.find({ user: userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }

};
