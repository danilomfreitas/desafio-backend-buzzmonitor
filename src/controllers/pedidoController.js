const { Pedido, Livro } = require('../../models')

const createOrder = async (req, res) => {
    try {
        const {livro_id, quantidade} = req.body;
        const livro = await Livro.findByPk(livro_id);

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }

        if(livro.estoque < quantidade) {
            const newOrder = await Pedido.create({
                livro_id,
                quantidade,
                status: 'Recusado'
              });
            return res.status(400).json({ error: 'Estoque insuficiente', order: newOrder});
        }

        const newOrder = await Pedido.create({
            livro_id,
            quantidade,
            status: 'Aceito'
        });

        livro.estoque -= quantidade;
        await livro.save();

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Pedido.findAll({
            include: [{
                model:Livro,
                as:'livro'
            }]
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createOrder,
    getAllOrders
};
