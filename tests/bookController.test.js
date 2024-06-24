const request = require('supertest');
const app = require("../src/app");
const BookService = require('../src/services/bookService');

jest.mock('../src/services/bookService');

describe('Book Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a book', async () => {
        const newBook = {
            title: 'Harry Potter and the Goblet of Fire',
            author: 'JK Rowling',
            release_year: 2000,
            inventory: 13,
        };

        BookService.createBook.mockResolvedValue(newBook);

        const res = await request(app).post('/books').send(newBook);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(newBook);
    });

    it('should fetch all books', async () => {
        const books = [
            { title: "Harry Potter and the Philosopher's Stone", author: 'JK Rowling', release_year: 1997, inventory: 11 },
            { title: 'Harry Potter and the Chamber of Secrets', author: 'JK Rowling', release_year: 1998, inventory: 10 },
            { title: 'A Brief History of Time', author: 'Stephen Hawking', release_year: 1988, inventory: 5 },
        ];

        BookService.getAllBooks.mockResolvedValue(books);

        const res = await request(app).get('/books');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(books);
    });

    it('should fetch a single book by ID', async () => {
        const book = { title: "Harry Potter and the Philosopher's Stone", author: 'JK Rowling', release_year: 1997, inventory: 11 };

        BookService.getBookById.mockResolvedValue(book);

        const res = await request(app).get('/books/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(book);
    });

    it('should return 404 if book by ID is not found', async () => {
        BookService.getBookById.mockResolvedValue(null);

        const res = await request(app).get('/books/999');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ error: 'Book not found' });
    });

    it('should update a book', async () => {
        const updatedBook = {
            title: 'Harry Potter and the Chamber of Secretssssss',
            author: 'JK Rowling',
            release_year: 1998,
            inventory: 15,
        };

        BookService.updateBook.mockResolvedValue(updatedBook);

        const res = await request(app).put('/books/1').send(updatedBook);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(updatedBook);
    });

    it('should return 404 if book to update is not found', async () => {
        BookService.updateBook.mockResolvedValue(null);

        const res = await request(app).put('/books/999').send({
            title: 'Updated Book',
            author: 'Author',
            release_year: 2020,
            inventory: 5,
        });
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ error: 'Book not found' });
    });

    it('should delete a book', async () => {
        BookService.deleteBook.mockResolvedValue(true);

        const res = await request(app).delete('/books/1');
        expect(res.statusCode).toEqual(204);
    });

    it('should return 404 if book to delete is not found', async () => {
        BookService.deleteBook.mockResolvedValue(false);

        const res = await request(app).delete('/books/999');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ error: 'Book not found' });
    });

    it('should filter books by title', async () => {
        const books = [
            { title: "Harry Potter and the Philosopher's Stone", author: 'JK Rowling', release_year: 1997, inventory: 11 },
            { title: 'Harry Potter and the Chamber of Secrets', author: 'JK Rowling', release_year: 1998, inventory: 10 },
        ];

        BookService.getBooksByFilters.mockResolvedValue(books);

        const res = await request(app).get('/books/search?title=Harry');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(books);
    });

    it('should filter books by author', async () => {
        const books = [
            { title: "Harry Potter and the Philosopher's Stone", author: 'JK Rowling', release_year: 1997, inventory: 11 },
            { title: 'Harry Potter and the Chamber of Secrets', author: 'JK Rowling', release_year: 1998, inventory: 10 },
        ];

        BookService.getBooksByFilters.mockResolvedValue(books);

        const res = await request(app).get('/books/search?author=Rowling');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(books);
    });

    it('should filter books by release year', async () => {
        const books = [
            { title: "Harry Potter and the Philosopher's Stone", author: 'JK Rowling', release_year: 1997, inventory: 11 },
        ];

        BookService.getBooksByFilters.mockResolvedValue(books);

        const res = await request(app).get('/books/search?release_year=1997');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(books);
    });

    it('should filter books by title and author', async () => {
        const books = [
            { title: "Harry Potter and the Philosopher's Stone", author: 'JK Rowling', release_year: 1997, inventory: 11 },
            { title: 'Harry Potter and the Chamber of Secrets', author: 'JK Rowling', release_year: 1998, inventory: 10 },
        ];

        BookService.getBooksByFilters.mockResolvedValue(books);

        const res = await request(app).get('/books/search?title=Harry&author=Rowling');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(books);
    });

    it('should filter books by title, author, and release year', async () => {
        const books = [
            { title: "Harry Potter and the Philosopher's Stone", author: 'JK Rowling', release_year: 1997, inventory: 11 },
        ];

        BookService.getBooksByFilters.mockResolvedValue(books);

        const res = await request(app).get('/books/search?title=Harry&author=Rowling&release_year=1997');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(books);
    });
});
