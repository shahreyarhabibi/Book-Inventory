import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('BooksController', () => {
  let booksController: BooksController;
  // Mock service to isolate controller testing
  const mockBooksService = {
    getAllBooks: jest.fn(),
    addBook: jest.fn(),
    updateBook: jest.fn(),
    deleteBook: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
  });

  describe('getAllBooks', () => {
    it('should return an array of books', async () => {
      const result = [{ id: '1', title: 'Book 1', author: 'Author 1' }];
      mockBooksService.getAllBooks.mockReturnValue(result);

      expect(await booksController.getAllBooks()).toBe(result);
    });
  });

  describe('addBook', () => {
    it('should add a book successfully', async () => {
      const newBook = { title: 'New Book', author: 'New Author' };
      const result = { id: '1', ...newBook };

      mockBooksService.addBook.mockReturnValue(result);

      expect(await booksController.addBook(newBook)).toBe(result);
    });

    it('should throw an error if title or author is missing', async () => {
      try {
        await booksController.addBook({ title: '', author: '' });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Missing title or author');
      }
    });
  });

  describe('updateBook', () => {
    it('should update a book successfully', async () => {
      const updatedBook = {
        id: '1',
        title: 'Updated Book',
        author: 'Updated Author',
      };

      // Mock the service method to return the updated book
      mockBooksService.updateBook.mockReturnValue(updatedBook);

      // Call the controller method and check the response
      const response = await booksController.updateBook('1', {
        title: 'Updated Book',
        author: 'Updated Author',
      });

      // The expected response is the updated book object directly
      expect(response).toEqual(updatedBook);
    });

    it('should throw an error if book is not found', async () => {
      // Mock the service method to return null when the book is not found
      mockBooksService.updateBook.mockReturnValue(null);

      try {
        // Call the controller method with a non-existing book ID
        await booksController.updateBook('1', { title: 'Updated Book' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Book with ID 1 not found');
      }
    });

    it('should throw an error if no fields are provided to update', async () => {
      try {
        // Call the controller method without providing any fields for update
        await booksController.updateBook('1', { title: '', author: '' });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe(
          'At least one field (title or author) must be provided',
        );
      }
    });
  });

  describe('deleteBook', () => {
    it('should delete a book successfully', async () => {
      // Mock the service method to return true indicating the book was deleted
      mockBooksService.deleteBook.mockReturnValue(true);

      // Call the controller method and check the response
      const response = await booksController.deleteBook('1');
      expect(response).toBe('Book with ID 1 deleted successfully');
    });

    it('should throw an error if book is not found', async () => {
      // Mock the service method to return false indicating the book was not found
      mockBooksService.deleteBook.mockReturnValue(false);

      try {
        // Call the controller method with a non-existing book ID
        await booksController.deleteBook('1');
      } catch (error) {
        // Ensure the error is a generic Error
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Book not found');
      }
    });
  });
});
