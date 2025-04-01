# Movies Project

This is a full-stack web application for managing movies, genres, and user reviews. The project includes a React-based frontend and an Express.js backend, with MongoDB as the database. It provides features like user authentication, role-based access control, and movie management.

## Features

### Backend
- User authentication and authorization using JWT (JSON Web Tokens).
- Role-based access control for Admin and User roles.
- RESTful API for managing users, movies, genres, and reviews.
- MongoDB integration using Mongoose for database operations.
- Middleware for error handling, authentication, and request validation.
- Secure password storage using bcrypt.js.
- File upload functionality for movie images using Multer.

### Frontend
- React-based UI with Vite for fast development.
- TailwindCSS for responsive and modern styling.
- React Router for navigation.
- State management using Redux Toolkit.
- Toast notifications using `react-toastify`.

---

## Backend Overview

The backend is built with **Express.js** and follows a modular structure to ensure scalability and maintainability. It provides a set of RESTful APIs for managing users, movies, genres, and reviews.

### Key Features of the Backend

1. **Authentication and Authorization**:
   - Users can register, log in, and log out.
   - JWT is used for secure authentication.
   - Role-based access control ensures that only admins can perform certain actions like managing movies and genres.

2. **Movie Management**:
   - Admins can create, update, and delete movies.
   - Movies include details like name, year, genre, cast, rating, and an image.
   - Users can view all movies and leave reviews.

3. **Genre Management**:
   - Admins can create, update, and delete genres.
   - Genres are associated with movies to categorize them.

4. **Review System**:
   - Users can leave reviews for movies, including a rating and a comment.
   - Admins can delete inappropriate reviews.

5. **File Uploads**:
   - Movie images are uploaded and stored using Multer.
   - Static file serving is enabled for uploaded images.

6. **Error Handling**:
   - Centralized error handling middleware ensures consistent error responses.
   - Validation errors, authentication errors, and server errors are handled gracefully.

7. **Database Integration**:
   - MongoDB is used as the database, with Mongoose for schema modeling and data validation.
   - Relationships between movies, genres, and reviews are managed effectively.

---

### Technologies Used in the Backend

- **Express.js**: A fast and minimalist web framework for building RESTful APIs.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB, used for schema modeling and database operations.
- **JWT (JSON Web Tokens)**: Used for secure user authentication and authorization.
- **bcrypt.js**: For hashing and securely storing user passwords.
- **Multer**: Middleware for handling file uploads (e.g., movie images).
- **dotenv**: For managing environment variables securely.
- **Express Async Handler**: Simplifies error handling in asynchronous routes.

---

### How the Backend Works

1. **User Authentication**:
   - Users register with their email and password, which are securely hashed using bcrypt.js.
   - Upon login, a JWT is issued, allowing the user to access protected routes.
   - Admins have additional privileges, such as managing movies and genres.

2. **Movie and Genre Management**:
   - Admins can create, update, and delete movies and genres via dedicated API endpoints.
   - Movies are associated with genres, and each movie can have multiple reviews.

3. **Review System**:
   - Users can leave reviews for movies, including a rating and a comment.
   - Reviews are linked to both the user and the movie in the database.

4. **File Uploads**:
   - Movie images are uploaded using Multer and stored in the `uploads` directory.
   - The backend serves these images as static files, making them accessible via URLs.

5. **Error Handling**:
   - Middleware catches errors and sends consistent error responses to the client.
   - Validation errors, authentication errors, and server errors are all handled centrally.

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/movies-project.git
   cd movies-project
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   npm install
   cd frontend && npm install
   ```

3. Set up environment variables in `.env`:
   ```env
   PORT=3000
   MONGO_URI=your-mongodb-uri
   JWT_TOKEN=your-secret-key
   NODE_ENV=production
   ```

4. Start the application:
   ```bash
   npm run fullstack
   ```

---

## API Endpoints

### User Routes
- `POST /api/v1/users` - Register a new user.
- `POST /api/v1/users/login` - Login a user.
- `POST /api/v1/users/logout` - Logout a user.
- `GET /api/v1/users/profile` - Get the current user's profile.
- `PUT /api/v1/users/profile` - Update the current user's profile.
- `GET /api/v1/users` - Get all users (Admin only).

### Movie Routes
- `GET /api/v1/movies` - Get all movies.
- `POST /api/v1/movies` - Create a new movie (Admin only).
- `GET /api/v1/movies/:id` - Get details of a specific movie.
- `PUT /api/v1/movies/:id` - Update a movie (Admin only).
- `DELETE /api/v1/movies/:id` - Delete a movie (Admin only).

### Genre Routes
- `GET /api/v1/genres` - Get all genres.
- `POST /api/v1/genres` - Create a new genre (Admin only).
- `PUT /api/v1/genres/:id` - Update a genre (Admin only).
- `DELETE /api/v1/genres/:id` - Delete a genre (Admin only).

### Review Routes
- `POST /api/v1/movies/:id/reviews` - Add a review to a movie.
- `DELETE /api/v1/movies/:movieId/reviews/:reviewId` - Delete a review (Admin only).

---

## Scripts

- `npm run fullstack` - Start both backend and frontend concurrently.
- `npm run backend` - Start the backend server.
- `npm run frontend` - Start the frontend development server.

---

## Conclusion

The Movies Project is a robust full-stack application that demonstrates the integration of a React frontend with an Express.js backend. It provides a seamless user experience for managing movies, genres, and reviews, with a focus on security, scalability, and maintainability.
