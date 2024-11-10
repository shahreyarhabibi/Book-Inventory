import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.model'; //

@Controller('books') // Define the base route for this controller
export class BooksController {
  constructor(private readonly booksService: BooksService) {} // Inject the BooksService

  // Endpoint to retrieve all books
  @Get()
  getAllBooks(): Book[] {
    return this.booksService.getAllBooks(); // Call the service method to get all books
  }

  // Endpoint to add a new book
  @Post()
  addBook(@Body() book: { title: string; author: string }): Book {
    const { title, author } = book; // Destructure title and author from the request body

    // Validate that title and author are present
    if (!title || !author) {
      throw new BadRequestException('Missing title or author'); // Throw an error if validation fails
    }

    // Send data to the service to create the book
    return this.booksService.addBook(title, author); // Call the service method to add the book
  }

  // Endpoint to update an existing book by ID
  @Put(':id')
  updateBook(
    @Param('id') id: string, // Get the book ID from the route parameters
    @Body() book: { title?: string; author?: string }, // Get the book data from the request body
  ): Book {
    // Validate that at least one field (title or author) is provided
    if (!book.title && !book.author) {
      throw new BadRequestException(
        'At least one field (title or author) must be provided',
      ); // Throw an error if validation fails
    }

    const updatedBook = this.booksService.updateBook(id, book); // Call the service method to update the book
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`); // Throw an error if the book is not found
    }

    return updatedBook; // Return the updated book
  }

  // Endpoint to delete a book by ID
  @Delete(':id')
  deleteBook(@Param('id') id: string): string {
    const result = this.booksService.deleteBook(id); // Call the service method to delete the book
    if (!result) {
      throw new Error('Book not found'); // Throw an error if the book is not found
    }
    return `Book with ID ${id} deleted successfully`; // Return a success message
  }
}
