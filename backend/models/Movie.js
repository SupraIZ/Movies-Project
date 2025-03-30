// Import mongoose for defining schemas and interacting with MongoDB
import mongoose from "mongoose";

// Destructure ObjectId for referencing other collections
const { ObjectId } = mongoose.Schema;

// Define the schema for reviews
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the reviewer
    rating: { type: Number, required: true }, // Rating given by the reviewer (e.g., 1-5)
    comment: { type: String, required: true }, // Review comment
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User who wrote the review
      required: true,
      ref: "User", // Refers to the "User" collection
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Define the schema for movies
const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the movie
    image: { type: String }, // URL or path to the movie's image/poster
    year: { type: Number, required: true }, // Release year of the movie
    genre: { 
      type: ObjectId, // Reference to the Genre collection
      ref: "Genre", // Refers to the "Genre" collection
      required: true,
    },
    detail: { type: String, required: true }, // Detailed description or synopsis of the movie
    cast: [{ type: String }], // Array of cast members (e.g., actors, directors)
    reviews: [reviewSchema], // Array of reviews for the movie
    numReviews: { 
      type: Number, 
      required: true, 
      default: 0, // Default number of reviews is 0
    },
    createdAt: { 
      type: Date, 
      default: Date.now, // Automatically sets the creation date
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Create the Movie model using the movieSchema
const Movie = mongoose.model("Movie", movieSchema);

// Export the Movie model for use in other parts of the application
export default Movie;