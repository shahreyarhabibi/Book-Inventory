# Book Management System

## Overview

The Book Management System is a full-stack application designed to manage a book inventory. The backend is built using NestJS, while the frontend is developed with Next.js. This application allows users to view, add, and manage books in a simple and responsive interface.

## Features

- **View Books**: Retrieve and display a list of all books in the inventory.
- **Add Book**: A form to add new books with validation for title and author.
- **Edit and Delete Books**: Update or remove books from the inventory.
- **Responsive Design**: The application is fully responsive, providing a great user experience on both desktop and mobile devices.
- **API Documentation**: Integrated Swagger UI for easy access to API documentation.
- **Search Functionality**: Find books quickly with a search feature.
- **Error Handling**: Comprehensive error handling for enhanced user experience.
- **Unit Testing**: Included unit tests with Jest to ensure code reliability.

## Tech Stack

- **Frontend**: Next.js, Axios
- **Backend**: NestJS, Swagger
- **Testing**: Jest
- **Containerization**: Docker

## Installation

### Prerequisites

- **Node.js** (version 22)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for containerization)

### Backend Setup

1. Clone the repository:
   git clone https://github.com/shahreyarhabibi/Book-Inventory.git
   cd backend

2. Install dependencies:
   npm install

3. Run the backend server:
   npm run start
4. Access the API at http://localhost:3001/books.

### Frontend Setup

1. Navigate to the frontend directory:
   cd frontend

2. Install dependencies:
   npm install

3. Run the frontend application:
   npm run dev

4. Access the application at http://localhost:3000

### Unit Testing

- Unit tests have been implemented using Jest. To run the tests, navigate to the root folder and run:
  **npm run test**

### API Documentation

The API documentation is available via Swagger UI at http://localhost:3001/api-docs. It includes details on the available endpoints, request/response formats, and error handling.

### Dockerization

To run the application using Docker, ensure you have Docker and Docker Compose installed. Then, follow these steps:

1. Navigate to the root directory of the project.
2. Run the following command to start the services:
   docker-compose up
3. Access the frontend at http://localhost:3000 and the API at http://localhost:3001.

### Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to open an issue or submit a pull request.

### Acknowledgments

[NestJS](https://www.nestjs.com)
[Next.js](https://nextjs.org)
[Swagger](https://swagger.io/)
[Axios](https://axios-http.com/)
