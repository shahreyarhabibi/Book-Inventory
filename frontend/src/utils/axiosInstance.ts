import axios from "axios";

// Create an instance of axios with default settings
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // Base URL for the API (assuming your backend is running on port 3001)
  headers: {
    "Content-Type": "application/json", // Set the default content type to JSON
  },
});

// Export the axios instance for use in other parts of the application
export default axiosInstance;
