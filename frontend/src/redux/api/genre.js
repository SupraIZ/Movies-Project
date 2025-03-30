// Import the base API slice to extend its functionality
import { apiSlice } from "./apiSlice";

// Import the constant URL for the genre API
import { GENRE_URL } from "../constants";

// Inject endpoints into the base API slice for genre-related operations
export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to create a new genre
    createGenre: builder.mutation({
      query: (newGenre) => ({
        url: `${GENRE_URL}`, // API endpoint for creating a genre
        method: "POST", // HTTP method
        body: newGenre, // Request body containing the new genre data
      }),
    }),

    // Mutation to update an existing genre
    updateGenre: builder.mutation({
      query: ({ id, updateGenre }) => ({
        url: `${GENRE_URL}/${id}`, // API endpoint for updating a specific genre by ID
        method: "PUT", // HTTP method
        body: updateGenre, // Request body containing the updated genre data
      }),
    }),

    // Mutation to delete a genre
    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `${GENRE_URL}/${id}`, // API endpoint for deleting a specific genre by ID
        method: "DELETE", // HTTP method
      }),
    }),

    // Query to fetch all genres
    fetchGenres: builder.query({
      query: () => `${GENRE_URL}/genres`, // API endpoint for fetching all genres
    }),
  }),
});

// Export hooks for each endpoint to use in components
export const {
  useCreateGenreMutation, // Hook for creating a genre
  useUpdateGenreMutation, // Hook for updating a genre
  useDeleteGenreMutation, // Hook for deleting a genre
  useFetchGenresQuery, // Hook for fetching all genres
} = genreApiSlice;