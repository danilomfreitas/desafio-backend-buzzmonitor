const { Order, Book} = require('../../models');

class OrderService {
    static async createOrder(data) {
        try {
            const { book_id, quantity } = data;
            const book = await Book.findByPk(book_id);

            if (!book) {
                return {
                    status: 'error',
                    code: 404,
                    message: 'Book not found'
                };
            }

            if (book.inventory < quantity) {
                const newOrder = await Order.create({
                    book_id: book_id,
                    quantity: quantity,
                    status: 'Refused'
                });
                return {
                    status: 'error',
                    code: 400,
                    message: 'Not enough stock',
                    order: newOrder
                };
            }

            const newOrder = await Order.create({
                book_id: book_id,
                quantity: quantity,
                status: 'Accepted'
            });

            book.inventory -= quantity;
            await book.save();

            return {
                status: 'success',
                order: newOrder
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getAllOrders() {
        try {
            return await Order.findAll({
                include: [{
                    model:Book,
                    as:'book'
                }]
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = OrderService;