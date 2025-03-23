# Movies Project

This is a full-stack web application for managing user authentication and profiles, built with a React frontend and an Express backend. The project uses MongoDB as the database and integrates various modern tools and libraries for seamless development.

## Features

### Backend
- User authentication with JWT (JSON Web Tokens).
- Role-based access control (Admin and User).
- RESTful API for user management.
- MongoDB integration using Mongoose.
- Middleware for error handling and authentication.

### Frontend
- React-based UI with Vite for fast development.
- TailwindCSS for styling.
- React Router for navigation.
- State management using Redux Toolkit.
- Toast notifications using `react-toastify`.

## Project Structure

```
Movies-Project/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # API controllers
│   ├── middlewares/     # Custom middlewares
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── index.js         # Entry point for the backend
├── frontend/
│   ├── src/             # React source files
│   ├── index.html       # HTML template
│   ├── vite.config.js   # Vite configuration
│   └── package.json     # Frontend dependencies
├── .env                 # Environment variables
├── package.json         # Root project dependencies
└── readme.md            # Project documentation
```

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
   NODE_ENV=development
   ```

4. Start the application:
   ```bash
   npm run fullstack
   ```

## API Endpoints

### User Routes
- `POST /api/v1/users` - Register a new user.
- `POST /api/v1/users/login` - Login a user.
- `POST /api/v1/users/logout` - Logout a user.
- `GET /api/v1/users/profile` - Get the current user's profile.
- `PUT /api/v1/users/profile` - Update the current user's profile.
- `GET /api/v1/users` - Get all users (Admin only).

## Scripts

- `npm run fullstack` - Start both backend and frontend concurrently.
- `npm run backend` - Start the backend server.
- `npm run frontend` - Start the frontend development server.

## Technologies Used

### Backend
- Express.js
- Mongoose
- JWT
- bcrypt.js

### Frontend
- React
- Redux Toolkit
- TailwindCSS
- React Router
- React Toastify
