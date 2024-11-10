import { useEffect, useState } from "react";
import { BookOpenIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/outline";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

// Define the structure of a NewBook object
type NewBook = {
  title: string;
  author: string;
};

// Define the props for the AddBookForm component
type AddBookFormProps = {
  onAddBook: (book: NewBook) => void; // Function to handle adding a book
  initialBook?: NewBook | null; // Accept initial book for editing
};

// AddBookForm component definition
const AddBookForm = ({ onAddBook, initialBook }: AddBookFormProps) => {
  const [book, setBook] = useState<NewBook>({ title: "", author: "" }); // State to hold the book details
  const [error, setError] = useState<string>(""); // State to hold error messages
  const [showAlert, setShowAlert] = useState(false); // State to control success alert visibility
  const [showErrorAlert, setShowErrorAlert] = useState(false); // State to control error alert visibility

  // Effect to populate the form with the book being edited
  useEffect(() => {
    if (initialBook) {
      setBook(initialBook); // Populate form with the book being edited
    } else {
      setBook({ title: "", author: "" }); // Reset form if no book is being edited
    }
  }, [initialBook]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value }); // Update book state with input values
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!book.title || !book.author) {
      setError("Title and Author are required"); // Set error message if fields are empty
      setShowErrorAlert(true); // Show error alert
      setTimeout(() => {
        setShowErrorAlert(false); // Hide error alert after 4 seconds
      }, 4000);
      return;
    }

    try {
      await onAddBook(book); // Call the function to add the book
      setError(""); // Clear error message
      setBook({ title: "", author: "" }); // Reset form fields
      setShowAlert(true); // Show success alert
      setTimeout(() => {
        setShowAlert(false); // Hide success alert after 4 seconds
      }, 4000);
    } catch (error) {
      setError("Error adding/updating book"); // Set error message if an error occurs
      console.error("Error adding/updating book:", error);
    }
  };

  return (
    <div className="p-4 rounded-md">
      {/* Error Alert */}
      {error && showErrorAlert && (
        <div
          role="alert"
          className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105 mb-4"
        >
          <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0 mr-2 text-red-600" />
          <p className="text-xs font-semibold">Error - {error}</p>
        </div>
      )}

      {/* Success Alert */}
      {showAlert && (
        <div className="space-y-2 p-4">
          <div
            role="alert"
            className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105"
          >
            <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0 mr-2 text-green-600" />
            <p className="text-xs font-semibold">
              Book Successfully Added/Updated in the Library!
            </p>
          </div>
        </div>
      )}

      {/* Form for Adding/Editing Book */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label className="block text-slate-100 mb-1 font-bold">Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className="w-full p-[8px] mb-[5px] font-sans text-left pl-10 border-b-2 border-white bg-transparent text-white text-[16px] focus:font-bold focus:outline-black focus:border-black placeholder-slate-300"
          />
          <BookOpenIcon className="absolute left-2 top-2/3 transform -translate-y-1/2 h-6 w-6 text-slate-300" />
        </div>
        <div className="relative">
          <label className="block text-slate-100 mb-1 font-bold">Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Enter author's name"
            className="w-full p-[8px] mb-[5px] font-sans text-left pl-10 border-b-2 border-white bg-transparent text-white text-[16px] focus:font-bold focus:outline-black focus:border-black placeholder-slate-300"
          />
          <UserIcon className="absolute left-2 top-2/3 transform -translate-y-1/2 h-6 w-6 text-slate-300" />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-slate-300/50 border border-white/20"
          >
            <span className="text-xs sm:text-sm md:text-lg">
              {initialBook ? "Edit Book" : "Add Book"}
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/20"></div>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
