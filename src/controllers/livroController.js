const { Livro } = require('../../models')

const getAllBooks = async (req, res) => {
    try {
        const books = await Livro.findAll();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getBookById = async (req, res) => {
    try {
        const book = await Livro.findByPk(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createBook = async (req, res) => {
    try {
        const newBook = await Livro.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateBook = async (req, res) => {
    try {
        const [updated] = await Livro.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedBook = await Livro.findByPk(req.params.id);
            res.status(200).json(updatedBook);
        } else {
            res.status(404).json({ error: "Livro não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteBook = async (req, res) => {
    try {
        const deleted = await Livro.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Livro não encontrado'});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
  };
  