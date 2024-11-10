import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.model';

@Injectable() // Mark the class as a service that can be injected
export class BooksService {
  private books: Book[] = []; // Store books in memory (for now)

  // Retrieve all books
  getAllBooks(): Book[] {
    return this.books; // Return the array of books
  }

  // Add a new book
  addBook(title: string, author: string): Book {
    const newBook: Book = {
      id: (this.books.length + 1).toString(), // Generate a new ID based on the current length of the books array
      title,
      author,
    };
    this.books.push(newBook); // Add the new book to the array
    return newBook; // Return the newly added book
  }

  // Delete a book by ID
  deleteBook(id: string): boolean {
    const bookIndex = this.books.findIndex((book) => book.id === id); // Find the index of the book with the given ID
    if (bookIndex === -1) {
      return false; // Book not found
    }
    this.books.splice(bookIndex, 1); // Remove the book from the array
    return true; // Successfully deleted
  }

  // Update an existing book by ID
  updateBook(
    id: string,
    updateData: { title?: string; author?: string }, // Accept optional title and author for updating
  ): Book | null {
    const book = this.books.find((book) => book.id === id); // Find the book by ID
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`); // Throw an error if the book is not found
    }

    // Update the book's title and/or author if provided
    if (updateData.title) {
      book.title = updateData.title;
    }
    if (updateData.author) {
      book.author = updateData.author;
    }

    return book; // Return the updated book
  }

  // Helper to check if a book exists by title (for error handling)
  private findBook(title: string): Book {
    const book = this.books.find((b: Book) => b.title === title); // Find the book by title
    if (!book) {
      throw new NotFoundException('Book not found'); // Throw an error if the book is not found
    }
    return book; // Return the found book
  }
}
