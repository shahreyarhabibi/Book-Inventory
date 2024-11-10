import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

// Define the structure of a Book object
type Book = {
  id: number;
  title: string;
  author: string;
};

// Define the props for the BookList component
type BookListProps = {
  books: Book[]; // Array of books to display
  onDelete: (id: number) => void; // Function to handle book deletion
  onEdit: (book: Book) => void; // Function to handle book editing
  className?: string; // Optional className for additional styling
};

// BookList component definition
const BookList: React.FC<BookListProps> = ({ books, onDelete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const itemsPerPage = 9; // Number of items to display per page

  // Function to handle book deletion
  const handleDelete = (id: number) => {
    onDelete(id);
  };

  // Calculate total pages based on the number of books
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const indexOfLastBook = currentPage * itemsPerPage; // Index of the last book on the current page
  const indexOfFirstBook = indexOfLastBook - itemsPerPage; // Index of the first book on the current page

  // Filter books based on the search term
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the current books to display on the current page
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Function to change the current page
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="relative rounded-lg p-4 overflow-x-auto">
      {/* Styled Search Input */}
      <div className="relative max-w-xs">
        {" "}
        {/* Set a max width for the container */}
        <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-300" />{" "}
        {/* Search icon */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          className="w-full p-[8px] mb-[5px] font-sans text-left pl-10 border-b-2 border-white bg-transparent text-white text-[16px] focus:font-bold hover:bg-blue-700/20 placeholder-slate-300"
        />
      </div>

      {/* Book Table */}
      <table className="min-w-full rounded-lg">
        <thead>
          <tr className="text-white text-left">
            <th className="py-2 px-4 border-b text-sm md:text-base">#</th>
            <th className="py-2 px-4 border-b text-sm md:text-base">Title</th>
            <th className="py-2 px-4 border-b text-sm md:text-base">Author</th>
            <th className="py-2 px-4 border-b text-center text-sm md:text-base">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book, index) => (
            <tr key={book.id} className="hover:bg-white/10 text-white">
              <td className="py-1 px-4 border-b text-sm md:text-base">
                {index + indexOfFirstBook + 1} {/* Display the book index */}
              </td>
              <td className="py-1 px-4 border-b text-sm md:text-base">
                {book.title} {/* Display the book title */}
              </td>
              <td className="py-1 px-4 border-b text-sm md:text-base">
                {book.author} {/* Display the book author */}
              </td>
              <td className="py-1 px-4 border-b text-center">
                {/* Edit Button */}
                <button
                  onClick={() => onEdit(book)} // Call onEdit when the edit button is clicked
                  className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-blue-500/70 backdrop-blur-lg px-3 py-1.5 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600 hover:bg-blue-600 border border-white/20 mr-2 mb-2 sm:mb-0"
                >
                  <span className="text-xs sm:text-sm md:text-sm">Edit</span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-10 bg-white/30"></div>
                  </div>
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(book.id)} // Call handleDelete when the delete button is clicked
                  className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-red-500/70 backdrop-blur-lg px-3 py-1.5 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-red-600 hover:bg-red-600 border border-white/20"
                >
                  <span className="text-xs sm:text-sm md:text-sm">Delete</span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-10 bg-white/30"></div>
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-2 space-x-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)} // Navigate to the previous page
          disabled={currentPage === 1} // Disable button if on the first page
          className={`text-white text-xs sm:text-sm md:text-base hover:text-violet-600 backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-md py-1 px-3 shadow hover:shadow-violet-600 duration-700 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &lt; {/* Previous page button */}
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)} // Navigate to the selected page
              className={`text-white text-xs sm:text-sm md:text-base hover:text-violet-600 backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-md py-1 px-3 shadow-md hover:shadow-violet-600 duration-700 ${
                page === currentPage ? "bg-blue-600/40 text-white" : ""
              }`}
            >
              {page} {/* Display page number */}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)} // Navigate to the next page
          disabled={currentPage === totalPages} // Disable button if on the last page
          className={`text-white text-xs sm:text-sm md:text-base hover:text-violet-600 backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-md py-1 px-3 shadow-md hover:shadow-violet-600 duration-700 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &gt; {/* Next page button */}
        </button>
      </div>
    </div>
  );
};

export default BookList;
