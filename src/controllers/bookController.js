const BookService = require('../services/bookService');

const getAllBooks = async (req, res) => {
    try {
        const books = await BookService.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookByFilters = async (req, res) => {
    try {
        const filters = req.query;
        const books = await BookService.getBooksByFilters(filters);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await BookService.getBookById(req.params.id);
        
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createBook = async (req, res) => {
    try {
        const newBook = await BookService.createBook(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const updatedBook = await BookService.updateBook(req.params.id, req.body);

        if (updatedBook) {
            res.status(200).json(updatedBook);
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const deleted = await BookService.deleteBook(req.params.id);

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Book not found'});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBookByFilters,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
  