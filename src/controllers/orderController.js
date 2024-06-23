const order = require('../../models/order');
const OrderService = require('../services/orderService');

const createOrder = async (req, res) => {
    try {
        const result = await OrderService.createOrder(req.body);

        console.log(result);

        if (result.status === 'error') {
            return res.status(result.code).json({ error: result.message, order: result.order });
        }

        res.status(201).json(result.order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createOrder,
    getAllOrders
};