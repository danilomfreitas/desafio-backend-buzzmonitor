const { Book } = require('../../models');
const { Op } = require('sequelize');

class BookService {
    static async getAllBooks() {
        try {
            return await Book.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getBooksByFilters(filters) {
        try {
            const queryFilters = {};
            
            if (filters.title) {
                queryFilters.title = {
                    [Op.iLike]: `%${filters.title}%`
                };
            }

            if(filters.author) {
                queryFilters.author = {
                    [Op.iLike]: `%${filters.author}%`
                };
            }

            if(filters.release_year) {
                const parsedYear = parseInt(filters.release_year, 10);

                if(!isNaN(parsedYear)) {
                    queryFilters.release_year = parsedYear;
                } else {
                    throw new Error('Invalid year format');
                }
            }

            return await Book.findAll({ where: queryFilters });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getBookById(id) {
        try {
            return await Book.findByPk(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async createBook(data) {
        try {
            return await Book.create(data);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async updateBook(id, data) {
        try {
            const [updated] = await Book.update(data, {
                where: { id }
            });

            if (updated) {
                return await Book.findByPk(id);
            }
            return null;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteBook(id) {
        try {
            const deleted = await Book.destroy({
                where: { id }
            });
            return deleted;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = BookService;
