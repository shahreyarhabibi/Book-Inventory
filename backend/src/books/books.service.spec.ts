import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { NotFoundException } from '@nestjs/common';
import { Book } from './book.model';

describe('BooksService', () => {
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
  });

  describe('getAllBooks', () => {
    it('should return an array of books', () => {
      const result: Book[] = [];
      booksService['books'] = result; // Set the internal books array

      expect(booksService.getAllBooks()).toBe(result);
    });
  });

  describe('addBook', () => {
    it('should add a new book and return it', () => {
      const title = 'New Book';
      const author = 'New Author';
      const result: Book = { id: '1', title, author };

      expect(booksService.addBook(title, author)).toEqual(result);
      expect(booksService.getAllBooks()).toContainEqual(result);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book by ID and return true', () => {
      const title = 'Book to Delete';
      const author = 'Author';
      booksService.addBook(title, author); // Add a book to delete
      const bookId = '1'; // Assuming this is the ID of the book added

      expect(booksService.deleteBook(bookId)).toBe(true);
      expect(booksService.getAllBooks()).not.toContainEqual({
        id: bookId,
        title,
        author,
      });
    });

    it('should return false if the book does not exist', () => {
      expect(booksService.deleteBook('non-existent-id')).toBe(false);
    });
  });

  describe('updateBook', () => {
    it('should update an existing book and return it', () => {
      const title = 'Book to Update';
      const author = 'Author';
      const book = booksService.addBook(title, author); // Add a book to update
      const updatedData = { title: 'Updated Title' };

      const updatedBook = booksService.updateBook(book.id, updatedData);
      expect(updatedBook).toEqual({ ...book, title: 'Updated Title' });
    });

    it('should throw NotFoundException if the book does not exist', () => {
      const updateData = { title: 'Updated Title' };

      expect(() =>
        booksService.updateBook('non-existent-id', updateData),
      ).toThrow(NotFoundException);
    });
  });
});
