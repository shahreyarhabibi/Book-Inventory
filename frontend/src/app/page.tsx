"use client"; // Indicates that this component is a client component in Next.js

import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance"; // Import the Axios instance for API calls
import BookList from "../components/BookList";
import AddBookForm from "../components/AddBookForm";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

// Define the structure of a Book object
type Book = {
  id: number;
  title: string;
  author: string;
};

// Define the structure of a NewBook object
type NewBook = {
  id?: number; // Optional ID for editing
  title: string;
  author: string;
};

// Main Page component
const Page = () => {
  const [books, setBooks] = useState<Book[]>([]); // State to hold the list of books
  const [error, setError] = useState<string | null>(null); // State to hold error messages
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false); // State to control error alert visibility
  const [editingBook, setEditingBook] = useState<NewBook | null>(null); // State for the book being edited

  // Fetch books from the backend when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("/books"); // Make GET request to fetch books
        setBooks(response.data); // Update state with fetched books
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to fetch books. Check if the backend's Running"); // Set error message
        setShowErrorAlert(true); // Show error alert
      }
    };

    fetchBooks(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle adding or updating a book
  const handleAddBook = async (newBook: NewBook) => {
    try {
      if (editingBook) {
        // If editing, update the book
        const response = await axiosInstance.put(
          `/books/${editingBook.id}`,
          newBook
        );
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === editingBook.id ? response.data : book
          )
        );
        setEditingBook(null); // Reset editing state
      } else {
        // If adding, create a new book
        const response = await axiosInstance.post("/books", newBook);
        setBooks((prevBooks) => [...prevBooks, response.data]); // Add new book to the list
      }
    } catch (error) {
      console.error("Error adding/updating book:", error);
      setError("Failed to add/update book. Please try again."); // Set error message
      setShowErrorAlert(true); // Show error alert
    }
  };

  // Function to handle editing a book
  const handleEdit = (book: Book) => {
    setEditingBook({ id: book.id, title: book.title, author: book.author }); // Set the book to be edited
  };

  // Function to handle deleting a book
  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/books/${id}`); // Make DELETE request to remove the book
      setBooks(books.filter((book) => book.id !== id)); // Update state to remove the deleted book
    } catch (error) {
      console.error("Error deleting book:", error);
      setError("Failed to delete book. Please try again."); // Set error message
      setShowErrorAlert(true); // Show error alert
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col pt-8">
      <title>Book Inventory By Ali Reza</title> {/* Page title */}
      {/* Background Image and Overlay */}
      <div className="absolute inset-0">
        <div className="bg-[url('/assets/image/library-1.jpg')] bg-center bg-cover blur-sm h-full w-full"></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      {/* Error Alert */}
      {error && showErrorAlert && (
        <div
          role="alert"
          className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 self-center w-[90%] rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105 mb-4"
        >
          <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0 mr-2 text-red-600" />
          <p className="text-xs font-semibold">Error - {error}</p>
        </div>
      )}
      {/* Main Title */}
      <h1 className="relative z-10 text-lg md:text-2xl font-bold text-slate-200 pl-10 text-left">
        Book Inventory
      </h1>
      {/* Main Content Area */}
      <main className="flex flex-col lg:flex-row flex-grow justify-between items-center p-4 pl-10 space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Add/Edit Book Form Section */}
        <section className="w-full lg:w-[30%] bg-white/20 rounded-xl shadow-lg p-6 backdrop-blur-md">
          <h2 className="text-md md:text-xl font-semibold text-[#ffffff] mb-4">
            {editingBook ? "Edit Book" : "Add New Book"}
          </h2>
          <AddBookForm
            onAddBook={handleAddBook} // Pass the add/update handler
            initialBook={editingBook} // Pass the editing book to the form
          />
        </section>

        {/* Book List Section */}
        <section className="w-full lg:w-[55%] max-h-[550px] bg-white rounded-xl shadow-2xl backdrop-blur-xl bg-opacity-20">
          <div className="overflow-auto h-full">
            <BookList
              books={books} // Pass the list of books
              onDelete={handleDelete} // Pass the delete handler
              onEdit={handleEdit} // Pass the edit handler
            />
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="relative z-10 p-4 text-center text-[#d5d8db] text-xs sm:text-sm md:text-base">
        <p>
          &copy; 2024 Book Inventory. All rights reserved by Ali Reza Habibi.
        </p>
      </footer>
    </div>
  );
};

export default Page;
